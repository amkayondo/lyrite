"use strict";

const m = require("mithril");

const css = require("./index.css");
const state = require("../state");

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

module.exports = {
    view : () =>
        m("div", {
                class : css.lyrics,
                style : {
                    fontSize : `${state.font.size}em`,
                    columnCount : state.cols.count
                }
            },
            state.song.lyrics
                .map((part, idx) =>
                    m("p", {
                            id    : part.hash,
                            class : [
                                state.selected === idx ? css.lineSelected : css.line,
                                part.style ? css[`s${part.style.idx}`] : null
                            ].join(" "),

                            onclick : () => {
                                state.action("CLICK LYRIC", idx);
                            }
                        },

                        m.trust(addBr(part.text))
                    )
                )
        )
};
