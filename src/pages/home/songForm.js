import { get } from "object-path";

import state from "../../state";

import css from "./songForm.css";
import error from "./error";

import validator from "../../lib/validator";
import { songSchema } from "../../lib/schemas";

let formState = {},
    validationResults = {},
    validate = validator(formState, formState);

function onsubmit(e) {
    if (e) {
        e.preventDefault();
    }

    validationResults = validate();

    if (validationResults.errors) {
        return;
    }

    state.action("IMPORT_SONG_LYRICS", formState)
        .then((slug) => {
            m.route.set(`/songs/${slug}`);
        });
}

export default {
    oninit(vnode) {
        const vs = vnode.state;

        vs.focused = "";
        formState.title   = "";
        formState.artist  = "";
        formState.lyrics  = "";

        validate = validator(formState, songSchema);
        validationResults = validate();

        vs.isFocused = function(dom, trueResult, falseResult) {
            return vs.focused === dom ? trueResult : falseResult;
        };
    },

    view(vnode) {
        const vs = vnode.state;
        const {
            isFocused, focused,
            titleDom, showTitleError,
            artistDom, showArtistError,
            lyricsDom, showLyricsError,
        } = vnode.state;
        const { title, artist, lyrics } = formState;

        return m("form", {
                class : css.center,

                onsubmit
            },

            // title input
            m("div", { class : isFocused(titleDom, css.titleFocused, css.title) },
                m(error, {
                    show   : showTitleError,
                    errors : get(validationResults, [ "errors", "title" ])
                }),

                m("input", {
                    value       : title,
                    placeholder : isFocused(titleDom, "", "Song Title"),

                    oncreate(titleVnode) {
                        vs.titleDom = titleVnode.dom;
                    },

                    onfocus(e) {
                        vs.focused = e.currentTarget;
                    },

                    onblur(e) {
                        if (focused === e.currentTarget) {
                            delete vs.focused;
                        }

                        vs.showTitleError = true;
                    },

                    oninput : m.withAttr("value", (value) => {
                        formState.title = value;
                        validationResults = validate();
                    })
                })
            ),

            // artist input
            m("div", { class : isFocused(artistDom, css.artistFocused, css.artist) },
                m(error, {
                    show   : showArtistError,
                    errors : get(validationResults, [ "errors", "artist" ])
                }),

                m("input", {
                    value       : artist,
                    placeholder : isFocused(artistDom, "", "Artist"),

                    oncreate(artistVnode) {
                        vs.artistDom = artistVnode.dom;
                    },

                    onfocus(e) {
                        vs.focused = e.currentTarget;
                    },

                    onblur(e) {
                        if (focused === e.currentTarget) {
                            delete vs.focused;
                        }

                        vs.showArtistError = true;
                    },

                    oninput : m.withAttr("value", (value) => {
                        formState.artist = value;
                        validationResults = validate();
                    })
                })
            ),

            // lyrics input
            m("div", { class : css.dash },
                m(error, {
                    show   : showLyricsError,
                    errors : get(validationResults, [ "errors", "lyrics" ])
                }),

                m("textarea", {
                    class       : isFocused(lyricsDom, css.textareaFocused, css.textarea),
                    value       : lyrics,
                    placeholder : isFocused(lyricsDom, "", "paste or drop lyrics"),

                    oncreate(lyricsVnode) {
                        vs.lyricsDom = lyricsVnode.dom;
                    },

                    onfocus(e) {
                        vs.focused = e.currentTarget;
                    },

                    onblur(e) {
                        if (focused === e.currentTarget) {
                            delete vs.focused;
                        }

                        vs.showLyricsError = true;
                    },

                    oninput : m.withAttr("value", (value) => {
                        formState.lyrics = value;
                        validationResults = validate();
                    }),

                    onkeydown(e) {
                        if (e.key === "Enter" && e.ctrlKey) {
                            onsubmit();
                        }
                    }
                })
            ),

            // load button
            !validationResults.errors ?
                m("div", { class : css.btnWrap },
                    m("button", {
                        class : css.loadBtn,
                        type  : "submit"
                    }, "load song")
                ) :
                null
        );
    }
};
