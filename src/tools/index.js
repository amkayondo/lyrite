"use strict";

const m = require("mithril");

const icons = require("../icons.svg");
const css = require("./index.css");

const state = require("../state");

module.exports = {
    view : (vnode) =>
        m("div", { class : vnode.state.show ? css.tools : css.toolsHide },
            m("button", {
                    class : css.show,
                    onclick : () => {
                        vnode.state.show = !vnode.state.show;

                        if(!vnode.state.show) {
                            state.action("HIDE TOOLS");
                        }
                    }
                },
                m("svg",
                    m("use", {
                        "xlink:href" : `${icons}#icon-quill`
                    })
                )
            ),
            state.styles.map((style, idx) =>
                m("button", {
                    class : css[style],

                    onclick : () => {
                        state.action("CLICK STYLE", idx);
                    }
                }, `Style ${idx}`)
            )
        )
};