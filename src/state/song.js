import slugify from "slugify";

import db, { _delete, serverTimestamp, arrayUnion, arrayRemove } from "../db";

import Song from "./classes/Song";

import parseLyrics from "../lib/parseLyrics";
import { getSongFromId } from "../lib/song";

const slugIdRegex = /\-(?!.*\-.*)/;

export default (State) => ({
    LOAD_SONG_BY_SLUG_AND_ID(slugAndId) {
        const [ slug, id ] = slugAndId.split(slugIdRegex);

        // current song..?
        if (!State.song || State.song.id !== id) {
            State.song = new Song({
                loading : true,
                slugAndId,
                slug,
                id
            });
        }

        State.unsubscribe = db.collection("songs").doc(id)
            .onSnapshot(doc => {
                if (!doc.exists) {
                    State.error = "404";

                    return m.route.set("/");
                }

                State.song.updateSnapshot(doc);

                m.redraw();
            });
    },

    // imports default songs to DB
    LOAD_SONGS_LIST() {
        State.songs = {
            loading : true,
            songs   : undefined // State.songs.songs !@#$@
        };

        return db.collection("songs").orderBy("created", "desc").onSnapshot(snap => {
            delete State.songs.loading;
            State.songs.loaded = Date.now();
            State.songs.songs = [];

            snap.forEach((doc) => {
                State.songs.songs.push({
                    doc,
                    id   : doc.id,
                    data : doc.data()
                });
            });

            m.redraw();
        });
    },

    // import song
    IMPORT_SONG_LYRICS(songObj) {
        const { uid } = State.session;
        const batch   = db.batch();
        const songRef = db.collection("songs").doc();
        const userRef = db.collection("users").doc(uid);

        const { title, artist, lyrics } = songObj;
        const slug = slugify(title);

        // update song
        batch.set(songRef, {
            created : serverTimestamp(),
            updated : serverTimestamp(),
            owner   : userRef,
            slug,
            title,
            artist,
            lyrics
        });

        // update user
        batch.update(userRef, {
            updated : serverTimestamp(),
            songs   : arrayUnion(songRef)
        });

        return batch.commit().then(() => {
            // todo: add data to constructor;
            State.song = new Song();

            return { slug, id : songRef.id };
        });
    },

    CLOSE_SONG() {
        if (State.unsubscribe) {
            State.unsubscribe();
        }

        delete State.unsubscribe;
        delete State.song;
    },

    TOGGLE_EDIT_CURRENT_SONG() {
        return State.edit ?
            State.action("CLOSE_EDIT_CURRENT_SONG") :
            State.action("OPEN_EDIT_CURRENT_SONG");
    },

    OPEN_EDIT_CURRENT_SONG() {
        State.edit = true;
    },

    CLOSE_EDIT_CURRENT_SONG() {
        State.edit = false;
    },

    UPDATE_PARSED_LYRICS(lyrics) {
        const doc = db.collection("songs").doc(State.song.id);

        debugger;
        State.song.data.lyrics = lyrics;
        doc.set(State.song.data);
    },

    // fake delete with undo, then real delete
    // - track deleted songs locally on State.delete = { id : true }
    // -
    DELETE_SONG_BY_ID(id) {
        // already queued to be deleted
        if (State.deleted[id]) {
            return;
        }

        State.deleted[id] = {
            song : getSongFromId(id)
        };

        // mark as deleted in Firestore
        db.collection("songs").doc(id)
            .update({
                updated : serverTimestamp(),
                deleted : serverTimestamp()
            })
            .then(() => {
                // timeout to actually delete
                // todo: change to firestore function, #40
                const timeoutId = setTimeout(() => {
                    const { uid } = State.session;
                    const batch   = db.batch();
                    const songRef = db.collection("songs").doc(id);
                    const userRef = db.collection("users").doc(uid);

                    batch.delete(songRef);
                    batch.update(userRef, {
                        updated : serverTimestamp(),
                        songs   : arrayRemove(songRef)
                    });

                    batch.commit()
                        .then(() => {
                            delete State.deleted[id];
                            m.redraw();
                        })
                        .catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                }, 5000);

                State.deleted[id] = {
                    timeoutId,
                    song : getSongFromId(id)
                };

                m.redraw();
            });
    },

    UNDO_DELETE_SONG_BY_ID(id) {
        if (!State.deleted || !State.deleted[id]) {
            return;
        }

        clearTimeout(State.deleted[id].timeoutId);

        db.collection("songs").doc(id)
            .update({
                deleted : _delete(),
                updated : serverTimestamp()
            })
            .then(() => {
                delete State.deleted[id];
                m.redraw();
            });
    },

    GET_SONGS_BY_USERNAME(username) {
        return db.collection("usernames").doc(username).get().then(usernameDoc => {
            return usernameDoc.data().user.onSnapshot(userSnapshot => {
                return Promise.all(
                    (userSnapshot.data().songs || []).map((songRef, idx) => {
                        return songRef.get();
                    })
                )
                .then(data => {
                    data.forEach((d, idx) => {
                        if (!idx) {
                            State.userSongs[username] = [];
                        }

                        State.userSongs[username].push({ id : d.id, data : d.data() });
                    });
                });
            });

            // return usernameDoc.data().user.get().then(userDoc => {
            //     debugger;
            // });
        });
        // db.collection("users").where("username", "==", username).get()
        // .then((doc) => {
        //     debugger;
        //     doc.docs.forEach
        // });
    }
});
