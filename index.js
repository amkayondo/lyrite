/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = m;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__song__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db__ = __webpack_require__(2);








const State = {
    appName: "Lyrite",
    tagline: "a tool to format lyrics",
    githubHref: "https://github.com/kevinkace/lyrite",

    styles: ["s0", "s1", "s2", "s3", "s4", "s5"],
    font: { size: 1.3 },
    cols: { count: 3 },

    // added to doc in script via webpack
    ver, // eslint-disable-line no-undef

    error: err => {
        console.error(err);
    },

    events: {
        mousemove: e => {
            State.tooltip.style = {
                left: `${e.clientX}px`,
                top: `${e.clientY}px`,
                opacity: e.clientY > State.header.height ? 0.8 : 0
            };

            __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
        }
    }
};

State.actions = Object.assign({
    "CLEAR DB": () => {
        __WEBPACK_IMPORTED_MODULE_4__db__["a" /* default */].clear();
    }
}, Object(__WEBPACK_IMPORTED_MODULE_1__tools__["a" /* default */])(State), Object(__WEBPACK_IMPORTED_MODULE_2__song__["a" /* default */])(State), Object(__WEBPACK_IMPORTED_MODULE_3__modal__["a" /* default */])(State));
State.action = (name, value) => State.actions[name](value);

window.state = State;

/* harmony default export */ __webpack_exports__["a"] = (State);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_path__);


// Table class, one created for each top level
function Table(key) {
    if (!key) {
        throw new Error("Must provide key");
    }

    // Private methods
    function _getTable() {
        const data = JSON.parse(localStorage.getItem(key)) || {};

        return data;
    }

    function _setTable(data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

    // init table data if needed
    if (!_getTable()) {
        _setTable({});
    }

    // Exposed API
    this.get = path => {
        const data = _getTable();

        return Object(__WEBPACK_IMPORTED_MODULE_0_object_path__["get"])(data, path);
    };

    this.set = (path, newData) => {
        const data = _getTable();

        Object(__WEBPACK_IMPORTED_MODULE_0_object_path__["set"])(data, path, newData);

        return _setTable(data);
    };

    this.del = path => {
        const data = _getTable();

        if (!path) {
            return;
        }

        delete data[path];

        return _setTable(data);
    };

    this.log = () => {
        console.log(localStorage.getItem(key));
    };
}

function parseQueryParams(queryParams) {
    if (typeof queryParams !== "string") {
        return queryParams;
    }

    return queryParams.split("&").reduce((acc, keyVal) => {
        let [key, value] = keyVal.split("=");

        // value is implicit true (for a query like post?untitied)
        if (!value) {
            value = true;
        } else {
            // parse "true", "false"
            value = parseValue(value);
        }

        acc[key] = value;

        return acc;
    }, {});
}

// pulls first key off path
function parseQuery(query) {
    const [keyPath, queryParams] = query.split("?");

    const [key, path] = keyPath.split(".");

    return {
        key,
        path,
        query: queryParams,
        queryParams: parseQueryParams(queryParams)
    };
}

function applyQueryParams(data, queryParams) {
    let filtered = Object.keys(data);

    Object.keys(queryParams).forEach(queryKey => {
        filtered = filtered.filter(slug => {
            // special case, eg songs?untitled=undefined
            if (queryParams[queryKey] === "undefined") {
                return data[slug][queryKey] === undefined;
            }

            return data[slug][queryKey] === queryParams[queryKey];
        });
    });

    return filtered.reduce((acc, cur) => {
        acc[cur] = data[cur];

        return acc;
    }, {});
}

function parseValue(value) {
    if (value === "true") {
        value = true;
    } else if (value === "false") {
        value = false;
    }
    // todo: int, float

    return value;
}

// create Tables
const db = {
    timestamp: Date.now(),
    tables: {
        songs: new Table("songs")
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    timestamp: () => db.timestamp,

    get: query => {
        const parsed = parseQuery(query);

        if (!parsed.key) {
            return;
        }

        const data = db.tables[parsed.key].get(parsed.path);

        if (!parsed.queryParams) {
            return data;
        }

        return applyQueryParams(data, parsed.queryParams);
    },
    set: (query, data) => {
        const parsed = parseQuery(query);

        if (!parsed.key) {
            return;
        }

        db.timestamp = Date.now();

        return db.tables[parsed.key].set(parsed.path, data);
    },
    del: query => {
        const parsed = parseQuery(query);

        if (!parsed.key) {
            return;
        }

        db.timestamp = Date.now();
        return db.tables[parsed.key].del(parsed.path);
    },
    clear: () => {
        localStorage.clear();
    }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MAX_TIMEOUT = 1000;

/* harmony default export */ __webpack_exports__["a"] = (function (dom, className) {
    return new Promise((res, rej) => {
        let resd = false;

        setTimeout(() => {
            if (resd) {
                return;
            }

            resd = true;
            rej(false);
            console.log("anim resolve timeout");
        }, MAX_TIMEOUT);

        dom.addEventListener("animationend", () => {
            if (resd) {
                return;
            }

            resd = true;
            res(true);
        }, { once: true, passive: true });

        dom.className = className;
    });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n    <title>lyrite-logo-vector-01-01</title>\n\n    <path class=\"cls-2\" d=\"M28.12,28.15c-6.53-1.22-.9-.16-7.15-1.36V4.35L7,2V26.92L28.12,30.5C28.11,28.84,28.1,29.72,28.12,28.15Z\"/>\n</svg>\n"

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_minireset_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__favicon_ico__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__favicon_ico___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__favicon_ico__);












const mountEl = document.getElementById("mount");

// state.debug = true;
__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].action("IMPORT DEFAULT SONGS");

__WEBPACK_IMPORTED_MODULE_2_mithril___default.a.route.prefix("");
__WEBPACK_IMPORTED_MODULE_2_mithril___default.a.route(mountEl, "/", __WEBPACK_IMPORTED_MODULE_3__routes__["a" /* default */]);

window.m = __WEBPACK_IMPORTED_MODULE_2_mithril___default.a;
window.state = __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */];

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = ({});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fontSans */
/* unused harmony export fontSerif */
/* unused harmony export animDur */
/* unused harmony export mount */
/* unused harmony export button */
/* unused harmony export title */
/* unused harmony default export */ var _unused_webpack_default_export = ({
    "fontSans": "Raleway, sans-serif",
    "fontSerif": "'Slabo 27px', serif",
    "animDur": "0.3s",
    "mount": "mount",
    "button": "mc70832d4a_button",
    "title": "mc70832d4a_title"
});
var fontSans = "Raleway, sans-serif";
var fontSerif = "'Slabo 27px', serif";
var animDur = "0.3s";
var mount = "mount";
var button = "mc70832d4a_button";
var title = "mc70832d4a_title";

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_layout__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_lyrics__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_error__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home__ = __webpack_require__(46);











/* harmony default export */ __webpack_exports__["a"] = ({
    "/": {
        onmatch: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLOSE SONG");
        },
        render: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_2__components_layout__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_5__components_home__["a" /* default */]))
    },

    "/:slug": {
        onmatch: args => __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("LOAD SONG BY SLUG", args.slug) ? __WEBPACK_IMPORTED_MODULE_3__components_lyrics__["a" /* default */] : __WEBPACK_IMPORTED_MODULE_4__components_error__["a" /* default */],
        render: comp => __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_2__components_layout__["a" /* default */], { header: true }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()(comp.tag))
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_path__);


/* harmony default export */ __webpack_exports__["a"] = (State => ({
    "CLICK LYRIC": idx => {
        const lineStyleIsSetStyle = Object(__WEBPACK_IMPORTED_MODULE_0_object_path__["get"])(State, "style.idx") === Object(__WEBPACK_IMPORTED_MODULE_0_object_path__["get"])(State, `song.lyrics.${idx}.style.idx`);

        // Deselect lyric
        // selected lyric without a style set
        if (State.selected === idx && (!State.style || lineStyleIsSetStyle)) {
            delete State.selected;

            return;
        }

        // Always set selected otherwise
        State.selected = idx;

        if (!State.style) {
            return;
        }

        // color
        State.action("COLOR SELECTED LYRIC", State.style.idx);

        return;
    },

    "CLICK STYLE": idx => {
        State.style = { idx };

        // Clicking first style after opening tools
        if (!State.tooltip) {
            // create tt obj
            State.tooltip = { style: {} };

            // add listing for tt position
            window.addEventListener("mousemove", State.events.mousemove);
        }

        // Nothing is selected so don"t color anything
        if (!State.selected && State.selected !== 0) {
            return;
        }

        // Color selected lyrics
        State.action("COLOR SELECTED LYRIC", idx);

        delete State.selected;
    },

    "COLOR SELECTED LYRIC": idx => {
        State.song.lyrics[State.selected].style = { idx };
    },

    "HIDE TOOLS": () => {
        delete State.selected;
        delete State.style;
        delete State.tooltip;

        State.action("CLOSE EDIT CURRENT SONG");

        window.removeEventListener("mousemove", State.events.mousemove);
    }
}));

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_eol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_hash__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_hash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_string_hash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_slugify__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_slugify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_slugify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__songs__ = __webpack_require__(16);








const titleSplit = "\n\n---\n\n";

function parseLyricString(lyricString) {
    return lyricString.split("\n\n").map(text => ({
        hash: __WEBPACK_IMPORTED_MODULE_1_string_hash___default()(text),
        text
    }));
}

function parseSongString(songString) {
    const [meta, lyricString] = __WEBPACK_IMPORTED_MODULE_0_eol___default.a.lf(songString).split(titleSplit);
    const [title, artist] = meta.split("\n");

    return {
        slug: __WEBPACK_IMPORTED_MODULE_2_slugify___default()(title),
        title,
        artist,
        lyricString: lyricString,
        lyrics: parseLyricString(lyricString)
    };
}

/* harmony default export */ __webpack_exports__["a"] = (State => ({
    // imports default songs to DB
    "IMPORT DEFAULT SONGS": () => {
        const savedSongs = __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].get("songs") || [];

        // add each default song
        __WEBPACK_IMPORTED_MODULE_4__songs__["a" /* default */].forEach(songString => {
            const songObj = parseSongString(songString);

            // don't add if already in DB
            if (songObj.slug in savedSongs) {
                return;
            }

            songObj.default = true;

            __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].set(`songs.${songObj.slug}`, songObj);
        });
    },

    // import song
    "IMPORT SONG LYRICS": songObj => {
        const untitledSongs = __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].get("songs?untitled");
        const title = `untitled ${Object.keys(untitledSongs).length + 1}`;
        const slug = __WEBPACK_IMPORTED_MODULE_2_slugify___default()(title);

        __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].set(`songs.${slug}`, Object.assign(songObj, {
            title,
            slug,
            lyrics: parseLyricString(songObj.lyricString),
            untitled: true
        }));

        return slug;
    },

    "DELETE SONG BY SLUG": slug => {
        __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].del(`songs.${slug}`);
    },

    "SET TITLE": title => {
        const oldSlug = State.song.slug;

        State.song.title = title;
        State.song.slug = __WEBPACK_IMPORTED_MODULE_2_slugify___default()(State.song.title);
        delete State.song.untitled;

        __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].set(`songs.${State.song.slug}`, State.song);
        __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].del(`songs.${oldSlug}`);
    },

    "LOAD SONG BY SLUG": slug => {
        State.song = __WEBPACK_IMPORTED_MODULE_3__db__["a" /* default */].get(`songs.${slug}`);

        if (!State.song) {
            State.error = "song not found";

            return;
        }

        return State.song;
    },

    "CLOSE SONG": () => {
        delete State.song;
    },

    "TOGGLE EDIT CURRENT SONG": () => {
        return State.edit ? State.action("CLOSE EDIT CURRENT SONG") : State.action("OPEN EDIT CURRENT SONG");
    },

    "OPEN EDIT CURRENT SONG": () => {
        State.edit = true;
    },

    "CLOSE EDIT CURRENT SONG": () => {
        State.edit = false;
    },

    "UPDATE PARSED LYRICS": () => {
        State.song.lyrics = parseLyricString(State.song.lyricString);
    }
}));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'eol', function() {

  var api = {}
  var isWindows = typeof process != 'undefined' && 'win32' === process.platform
  var linebreak = isWindows ? '\r\n' : '\n'
  var newline = /\r\n|\r|\n/g

  function before(text) {
    return linebreak + text
  }

  function after(text) {
    return text + linebreak
  }

  function converts(to) {
    function convert(text) {
      return text.replace(newline, to)
    }
    convert.toString = function() {
      return to
    }
    return convert 
  }

  function split(text) {
    return text.split(newline)
  }

  api['lf'] = converts('\n')
  api['cr'] = converts('\r')
  api['crlf'] = converts('\r\n')
  api['auto'] = converts(linebreak)
  api['before'] = before
  api['after'] = after
  api['split'] = split
  return api
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


;(function (name, root, factory) {
  if (true) {
    module.exports = factory()
    module.exports['default'] = factory()
  }
  /* istanbul ignore next */
  else if (typeof define === 'function' && define.amd) {
    define(factory)
  }
  else {
    root[name] = factory()
  }
}('slugify', this, function () {
  /*eslint-disable */
  var charMap = JSON.parse('{"$":"dollar","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","џ":"dz","Ґ":"G","ґ":"g","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\\"","”":"\\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₹":"indian rupee","₽":"russian ruble","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}')
  /*eslint-enable */

  function replace (string, options) {
    options = (typeof options === 'string')
      ? {replacement: options}
      : options || {}

    string = string.split('')
      .reduce(function (result, ch) {
        if (charMap[ch]) {
          ch = charMap[ch]
        }
        // allowed
        ch = ch.replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]/g, '')
        result += ch
        return result
      }, '')
      // trim leading/trailing spaces
      .replace(/^\s+|\s+$/g, '')
      // convert spaces
      .replace(/[-\s]+/g, options.replacement || '-')
      // remove trailing separator
      .replace('#{replacement}$', '')

    return options.lower ? string.toLowerCase() : string
  }

  replace.extend = function (customMap) {
    for (var key in customMap) {
      charMap[key] = customMap[key]
    }
  }

  return replace
}))


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__songs_smells_like_teen_spirit_txt__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__songs_smells_like_teen_spirit_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__songs_smells_like_teen_spirit_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__songs_judy_is_a_punk_txt__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__songs_judy_is_a_punk_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__songs_judy_is_a_punk_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__songs_hatebreeders_txt__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__songs_hatebreeders_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__songs_hatebreeders_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__songs_gods_plan_txt__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__songs_gods_plan_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__songs_gods_plan_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__songs_perfect_txt__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__songs_perfect_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__songs_perfect_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__songs_finesse_remix_txt__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__songs_finesse_remix_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__songs_finesse_remix_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__songs_son_of_a_gun_txt__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__songs_son_of_a_gun_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__songs_son_of_a_gun_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__songs_sparks_txt__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__songs_sparks_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__songs_sparks_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__songs_black_hole_sun_txt__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__songs_black_hole_sun_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__songs_black_hole_sun_txt__);










/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__songs_smells_like_teen_spirit_txt___default.a, __WEBPACK_IMPORTED_MODULE_1__songs_judy_is_a_punk_txt___default.a, __WEBPACK_IMPORTED_MODULE_2__songs_hatebreeders_txt___default.a, __WEBPACK_IMPORTED_MODULE_3__songs_gods_plan_txt___default.a, __WEBPACK_IMPORTED_MODULE_4__songs_perfect_txt___default.a, __WEBPACK_IMPORTED_MODULE_5__songs_finesse_remix_txt___default.a, __WEBPACK_IMPORTED_MODULE_6__songs_son_of_a_gun_txt___default.a, __WEBPACK_IMPORTED_MODULE_7__songs_sparks_txt___default.a, __WEBPACK_IMPORTED_MODULE_8__songs_black_hole_sun_txt___default.a]);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "Smells Like Teen Spirit\nNirvana\n\n---\n\nLoad up on guns, Bring your friends\nIt's fun to lose and to pretend\n\nShe's overboard, self assured\nOh no I know, a dirty word\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido, yeah\n\nHey, yay\n\nI'm worse at what I do best\nAnd for this gift, I feel blessed\n\nOur little group has always been\nAnd always will until the end\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido, yeah\n\nHey, yay\n\nAnd I forget just why I taste\nOh yeah, I guess it makes me smile\n\nI found it hard, it was hard to find\nOh well, whatever, nevermind\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido\n\nA denial, A denial, A denial, A denial, A denial\nA denial, A denial, A denial, A denial\n"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "Judy is a Punk\nThe Ramones\n\n---\n\nJackie is a punk\nJudy is a runt\nThey both went down to Berlin, joined the Ice Capades\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n\nSecond verse, same as the first\n\nJackie is a punk\nJudy is a runt\nThey both went down to Berlin, joined the Ice Capades\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n\nThird verse, different from the first\n\nJackie is a punk\nJudy is a runt\nThey both went down to San Frisco, joined the SLA\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "Hatebreeders\nThe Misfits\n\n---\n\nWhoa oh oh\nNo\nWhoa oh oh\nHate breeders\nWhoa oh oh\nWhoa oh oh\nHate breeders\nWhoa oh oh\n\nBrain invasion goin' on in everyone\nYou feel the things that make your world turn angry red\nBecause the next time you can't take it\nNext thought murderlation\nAnd hate is all you want to know\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nMurder one inborn into your every cell\nIt's in your blood and you can't shake it\nBecause you were bred to take it\nNext stop annihilation\nThey bred the hate right in your bones\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nBecause you were bred to take it\nNext stop annihilation\nThey bred the hate right in your fuckin' bones\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nHate is your mistress and you shall not want\nYou shall not want because your breed is strong\nBecause when they try to break you\nNew world desolation\nAnd strength is all you gotta know\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nAnd all you know\nHatebreeders\nWhoa oh oh\nAnd all you know\nHatebreeders\nWhoa oh oh\n"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "God's plan\nDrake\n\n---\n\nYeah they wishin' and wishin' and wishin' and wishin'\nThey wishin' on me, yuh\n\nI been movin' calm, don't start no trouble with me\nTryna keep it peaceful is a struggle for me\nDon’t pull up at 6 AM to cuddle with me\nYou know how I like it when you lovin' on me\nI don’t wanna die for them to miss me\nYes I see the things that they wishin' on me\nHope I got some brothers that outlive me\nThey gon' tell the story, shit was different with me\n\nGod's plan, God's plan\nI hold back, sometimes I won't, yuh\nI feel good, sometimes I don't, ay, don't\nI finessed down Weston Road, ay, 'nessed\nMight go down a G.O.D., yeah, wait\nI go hard on Southside G, yuh, wait\nI make sure that north-side eat\nAnd still\n\nBad things\nIt's a lot of bad things\nThat they wishin' and wishin' and wishin' and wishin'\nThey wishin' on me\nBad things\nIt's a lot of bad things\nThat they wishin' and wishin' and wishin' and wishin'\nThey wishin' on me\nYuh, ay, ay\n\nShe say, \"Do you love me?\" I tell her, \"Only partly\"\nI only love my bed and my momma, I'm sorry\nFifty dub, I even got it tatted on me\n81, they'll bring the crashers to the party\nAnd you know me\nTurn the O2 into the O3, dog\nWithout 40, Oli', there would be no me\nImagine if I never met the broskies\n\nGod's plan, God's plan\nI can't do this on my own, ay, no, ay\nSomeone watchin' this shit close, yep, close\nI've been me since Scarlett Road, ay, road, ay\nMight go down as G.O.D., yeah, wait\nI go hard on Southside G, ay, wait\nI make sure that north-side eat, yuh\nAnd still\n\nBad things\nIt's a lot of bad things\nThat they wishin' and wishin' and wishin' and wishin'\nThey wishin' on me\nYeah, yeah\nBad things\nIt's a lot of bad things\nThat they wishin' and wishin' and wishin' and wishin'\nThey wishin' on me\nYeah"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "Perfect\nEd Sheeran\n\n---\n\nI found a love for me\nDarling just dive right in\nAnd follow my lead\nWell I found a girl beautiful and sweet\nI never knew you were the someone waiting for me\n'Cause we were just kids when we fell in love\n\nNot knowing what it was\nI will not give you up this time\nBut darling, just kiss me slow, your heart is all I own\nAnd in your eyes you're holding mine\n\nBaby, I'm dancing in the dark with you between my arms\nBarefoot on the grass, listening to our favorite song\nWhen you said you looked a mess, I whispered underneath my breath\nBut you heard it, darling, you look perfect tonight\n\nWell I found a woman, stronger than anyone I know\nShe shares my dreams, I hope that someday I'll share her home\nI found a love, to carry more than just my secrets\nTo carry love, to carry children of our own\nWe are still kids, but we're so in love\nFighting against all odds\nI know we'll be alright this time\nDarling, just hold my hand\nBe my girl, I'll be your man\nI see my future in your eyes\n\nBaby, I'm dancing in the dark, with you between my arms\nBarefoot on the grass, listening to our favorite song\nWhen I saw you in that dress, looking so beautiful\nI don't deserve this, darling, you look perfect tonight\n\nBaby, I'm dancing in the dark, with you between my arms\nBarefoot on the grass, listening to our favorite song\nI have faith in what I see\nNow I know I have met an angel in person\nAnd she looks perfect\nI don't deserve this\nYou look perfect tonight"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "Finesse remix\nBruno Mars feat Cardi B\n\n---\n\nDrop top Porsche (Porsche), Rollie on my wrist (wrist)\nDiamonds up and down my chain (aha)\nCardi B, straight stuntin', can't tell me nothin'\nBossed up and I changed the game (you see me?)\nIt's my big Bronx boogie, got all them girls shook (shook)\nMy big fat ass got all them boys hooked (hooked)\nI went from dollar bills, now we poppin' rubber bands (ha)\nBruno sang to me while I do my money dance like ayy\nFlexin' on the 'Gram like ayy\nHit the Lil' Jon, okay (okay), okay (okay)\nOh yeah, we drippin' in finesse and getting paid, ow\n\n[Verse 2: Bruno Mars]\nOoh, don't we look good together?\nThere's a reason why they watch all night long (all night long)\nYeah, I know we'll turn heads forever (forever)\nSo tonight, I'm gonna show you off\n\n[Pre-Chorus: Bruno Mars]\nWhen I'm walkin' with you\nI watch the whole room change\nBaby, that's what you do\nNo, my baby, don't play\nBlame it on my confidence\nOh, blame it on your measurements\nShut that shit down on sight\nThat's right\n\n[Chorus: Bruno Mars]\nWe out here drippin' in finesse\nIt don't make no sense\nOut here drippin' in finesse\nYou know it, you know it\nWe out here drippin' in finesse\nIt don't make no sense\nOut here drippin' in finesse\nYou know it, you know it\n\n[Verse 3: Bruno Mars]\nNow slow it down for me, baby (slow it down now)\n'Cause I love the way it feels when we grind (we grind)\nYeah, our connection's so magnetic on the floor\nNothing can stop us tonight\n\n[Pre-Chorus: Bruno Mars]\nWhen I'm walkin' with you\nI watch the whole room change\nBaby, that's what you do\nNo, my baby, don't play\nBlame it on my confidence\nOh, blame it on your measurements\nShut that shit down on sight\nThat's right\n\n[Chorus: Bruno Mars]\nWe out here drippin' in finesse\nIt don't make no sense\nOut here drippin' in finesse\nYou know it, you know it\nWe out here drippin' in finesse\nIt don't make no sense\nOut here drippin' in finesse\nYou know it, you know it\n\n[Bridge: Bruno Mars & Cardi B]\nFellas, grab your ladies if your lady fine\nTell her she the one, she the one for life (woo)\nLadies, grab your fellas and let's do this right (do this right)\nIf you're on one like me in mind (ow!)\nYeah, we got it goin' on, got it goin' on\nDon't it feel so good to be us? (ayy)\nYeah, we got it goin' on, got it goin' on (yeah)\nGirl, we got it goin' on\nYeah, we got it goin' on, got it goin' on (hey)\nDon't it feel so good to be us, ayy? (feels so good on you)\nYeah, we got it goin' on, got it goin' on\n\n[Chorus: Bruno Mars]\nWe out here drippin' in finesse (we drippin' on them)\nIt don't make no sense\nOut here drippin' in finesse\nYou know it, you know it\nWe out here drippin' in finesse with my baby\nIt don't make no sense\nOut here drippin' in finesse\nYou know it, you know it (yeah, you know we got it goin' on)\n\n[Outro: Cardi B & Bruno Mars / Both]\nYeah, we got it goin' on, got it goin' on\nDon't it feel so good to be us, ayy?\nYeah, we got it goin' on, got it goin' on\nYou know it, you know it\nYeah, we got it goin' on, got it goin' on\nGirl, we got it\nDon't it feel so good to be us, ayy?\nYeah, we got it goin' on, got it goin' on\nYou know it, you know it\n"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "Son of a Gun\nNirvana\n\n---\n\nUp, up, up and down\nTurn, turn, turn around\nRound, round, round about\nAnd over again\n\nGun, gun, son of a gun\nYou are the only one\nMakes any difference to what I say\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nUp, up, up and down\nTurn, turn, turn around\nRound, round, round about\nAnd over again\n\nGun, gun, son of a gun\nYou are the only one\nMakes any difference to what I say\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nUp, up, up and down\nTurn, turn, turn around\nRound, round, round about\nAnd over again\n\nGun, gun, son of a gun\nYou are the only one\nMakes any difference to what I say\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n\nThe sun shines in the bedroom\nWhen we play\nThe raining always starts\nWhen you go away\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "Sparks\nColdplay\n\n---\n\nDid I drive you away\nI know what you'll say\nYou say, oh, sing one we know\nBut I promise you this\nI'll always look out for you\nThat's what I'll do\n\nI say oh\nI say oh\n\nMy heart is yours\nIt's you that I hold on to\nThat's what I do\nAnd I know I was wrong\nBut I won't let you down\n(Oh yeah, yeah, yes I will)\n\nI say oh\nI cry oh\n\nAnd I saw sparks\nYeah I saw sparks\nAnd I saw sparks\nYeah I saw sparks\nSing it out\n\nLa, la, la, la, oh\nLa, la, la, la, oh\nLa, la, la, la, oh\nLa, la, la, la, oh\n"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "Black Hole sun\nSoundgarden\n\n---\n\nIn my eyes, indisposed\nIn disguises no one knows\nHides the face, lies the snake\nThe sun in my disgrace\nBoiling heat, summer stench\n'Neath the black the sky looks dead\nCall my name through the cream\nAnd I'll hear you scream again\n\nBlack hole sun\nWon't you come\nAnd wash away the rain\nBlack hole sun\nWon't you come\nWon't you come (won't you come)\n\nStuttering, cold and damp\nSteal the warm wind tired friend\nTimes are gone for honest men\nAnd sometimes far too long for snakes\nIn my shoes, a walking sleep\nAnd my youth I pray to keep\nHeaven sent hell away\nNo one sings like you anymore\n\nBlack hole sun\nWon't you come\nAnd wash away the rain\nBlack hole sun\nWon't you come\nWon't you come\nBlack hole sun\nWon't you come\nAnd wash away the rain\nBlack hole sun\nWon't you come\nWon't you come (black hole sun, black hole sun)\n\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\n\nHang my head, drown my fear\nTill you all just disappear\n\nBlack hole sun\nWon't you come\nAnd wash away the rain\nBlack hole sun\nWon't you come\nWon't you come\nBlack hole sun\nWon't you come\nAnd wash away the rain\nBlack hole sun\nWon't you come\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\nWon't you come (black hole sun, black hole sun)\nWon't you come\nWon't you come\n"

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);


/* harmony default export */ __webpack_exports__["a"] = (State => ({
    "OPEN TITLE MODAL": () => {
        if (!State.song) {
            return;
        }

        State.modal = "title";

        __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
    },

    "ADD TITLE MODAL": title => {
        State.action("SET TITLE", title);

        State.action("CLOSE MODAL");

        __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.set(State.song.slug);
    },

    "CLOSE MODAL": () => {
        delete State.modal;
    }
}));

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icons_github_svg__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icons_github_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__icons_github_svg__);










/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", vnode.attrs.header ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_3__header__["a" /* default */]) : null, vnode.children, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].debug ? [__WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].clear,
        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLEAR DB");
        }
    }, "clear"), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("pre", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].debug }, JSON.stringify(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */], null, 2))] : null, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].bug }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        href: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].githubHref,
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].github
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust(__WEBPACK_IMPORTED_MODULE_5__icons_github_svg___default.a)), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].ver
    }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].ver.tag)), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].modal ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_4__modal__["a" /* default */]) : null)
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export animDur */
/* unused harmony export bug */
/* unused harmony export github */
/* unused harmony export ver */
/* unused harmony export clear */
/* unused harmony export debug */
/* harmony default export */ __webpack_exports__["a"] = ({
    "animDur": "0.3s",
    "bug": "mc55d93723_bug",
    "github": "mc55d93723_github",
    "ver": "mc55d93723_ver",
    "clear": "mc55d93723_clear",
    "debug": "mc55d93723_debug"
});
var animDur = "0.3s";
var bug = "mc55d93723_bug";
var github = "mc55d93723_github";
var ver = "mc55d93723_ver";
var clear = "mc55d93723_clear";
var debug = "mc55d93723_debug";

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_animResolve__ = __webpack_require__(3);











/* harmony default export */ __webpack_exports__["a"] = ({
    oncreate: vnode => {
        __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].header = {
            height: vnode.dom.offsetHeight
        };
    },
    onbeforeremove: vnode => Object(__WEBPACK_IMPORTED_MODULE_5__lib_animResolve__["a" /* default */])(vnode.dom, __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].headerOut),
    onremove: () => {
        delete __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].header;
    },
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].headerIn }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h1", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].title }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song ? __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.title : __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].appName), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].logo }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        href: "/",
        oncreate: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.link
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust(__WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg___default.a))), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* default */]) : null)
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export animDur */
/* unused harmony export header */
/* unused harmony export headerIn */
/* unused harmony export headerOut */
/* unused harmony export logo */
/* unused harmony export title */
/* harmony default export */ __webpack_exports__["a"] = ({
    "animDur": "0.3s",
    "header": "mc23bfb80c_header",
    "headerIn": "mc23bfb80c_header mc23bfb80c_headerIn",
    "headerOut": "mc23bfb80c_header mc23bfb80c_headerOut",
    "logo": "mc23bfb80c_logo",
    "title": "mc70832d4a_title mc23bfb80c_title"
});
var animDur = "0.3s";
var header = "mc23bfb80c_header";
var headerIn = "mc23bfb80c_header mc23bfb80c_headerIn";
var headerOut = "mc23bfb80c_header mc23bfb80c_headerOut";
var logo = "mc23bfb80c_logo";
var title = "mc70832d4a_title mc23bfb80c_title";

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip_css__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons_quill_svg__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons_quill_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__icons_quill_svg__);









/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: vnode.state.show ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].tools : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].toolsHide },

    // Show/hide tool button
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].show,
        onclick: () => {
            vnode.state.show = !vnode.state.show;

            if (!vnode.state.show) {
                __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("HIDE TOOLS");
            }
        }
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust(__WEBPACK_IMPORTED_MODULE_4__icons_quill_svg___default.a)),

    // Style buttons
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, "styles "), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].styles.map((style, idx) => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style && __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style.idx === idx ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */][`${style}Selected`] : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */][style],

        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLICK STYLE", idx);
        }
    }, `${idx}`)))),

    // Font choices
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, "font "), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].font,
        onmouseover: () => {
            vnode.state.range = Date.now();
        },
        onmouseout: () => {
            let now = Date.now();

            setTimeout(() => {
                if (now < vnode.state.range) {
                    return;
                }

                vnode.state.range = false;

                __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
            }, 300);
        }
    }, parseFloat(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size, 10).toFixed(2)), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("input", {
        type: "range",
        min: 0.7,
        max: 3,
        step: 0.05,

        class: vnode.state.range ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].range : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].rangeHide,

        onmouseover: () => {
            vnode.state.range = Date.now();
        },
        onmouseout: () => {
            let now = Date.now();

            setTimeout(() => {
                if (now < vnode.state.range) {
                    return;
                }

                vnode.state.range = false;

                __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
            }, 300);
        },

        value: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size,
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size = v;
        })
    }))),

    // Column
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, "cols "), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].dec,
        onclick: () => {
            if (__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count === 1) {
                return;
            }

            --__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count;
        }
    }, "<"), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].cols }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].inc,
        onclick: () => {
            ++__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count;
        }
    }, ">"))), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust("&nbsp;")), // I'm a terrible person
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].edit,
        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("TOGGLE EDIT CURRENT SONG");
        }
    }, "edit"))),

    // Style tooltip
    __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_3__tooltip_css__["a" /* default */][`s${__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style.idx}`],
        style: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].tooltip.style
    }) : null)
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export animDur */
/* unused harmony export tools */
/* unused harmony export toolsHide */
/* unused harmony export setting */
/* unused harmony export show */
/* unused harmony export label */
/* unused harmony export control */
/* unused harmony export button */
/* unused harmony export s0 */
/* unused harmony export s1 */
/* unused harmony export s2 */
/* unused harmony export s3 */
/* unused harmony export s4 */
/* unused harmony export s5 */
/* unused harmony export selected */
/* unused harmony export s0Selected */
/* unused harmony export s1Selected */
/* unused harmony export s2Selected */
/* unused harmony export s3Selected */
/* unused harmony export s4Selected */
/* unused harmony export s5Selected */
/* unused harmony export font */
/* unused harmony export range */
/* unused harmony export rangeHide */
/* unused harmony export dec */
/* unused harmony export inc */
/* unused harmony export cols */
/* unused harmony export edit */
/* harmony default export */ __webpack_exports__["a"] = ({
    "animDur": "0.3s",
    "tools": "mce8163484_tools",
    "toolsHide": "mce8163484_tools mce8163484_toolsHide",
    "setting": "mce8163484_setting",
    "show": "mce8163484_show",
    "label": "mce8163484_label",
    "control": "mce8163484_control",
    "button": "mc70832d4a_button mce8163484_button",
    "s0": "mc70832d4a_button mce8163484_button mce8163484_s0",
    "s1": "mc70832d4a_button mce8163484_button mce8163484_s1",
    "s2": "mc70832d4a_button mce8163484_button mce8163484_s2",
    "s3": "mc70832d4a_button mce8163484_button mce8163484_s3",
    "s4": "mc70832d4a_button mce8163484_button mce8163484_s4",
    "s5": "mc70832d4a_button mce8163484_button mce8163484_s5",
    "selected": "mce8163484_selected",
    "s0Selected": "mc70832d4a_button mce8163484_button mce8163484_s0 mce8163484_selected mce8163484_s0Selected",
    "s1Selected": "mc70832d4a_button mce8163484_button mce8163484_s1 mce8163484_selected mce8163484_s1Selected",
    "s2Selected": "mc70832d4a_button mce8163484_button mce8163484_s2 mce8163484_selected mce8163484_s2Selected",
    "s3Selected": "mc70832d4a_button mce8163484_button mce8163484_s3 mce8163484_selected mce8163484_s3Selected",
    "s4Selected": "mc70832d4a_button mce8163484_button mce8163484_s4 mce8163484_selected mce8163484_s4Selected",
    "s5Selected": "mc70832d4a_button mce8163484_button mce8163484_s5 mce8163484_selected mce8163484_s5Selected",
    "font": "mce8163484_font",
    "range": "mce8163484_range",
    "rangeHide": "mce8163484_range mce8163484_rangeHide",
    "dec": "mc70832d4a_button mce8163484_button mce8163484_dec",
    "inc": "mc70832d4a_button mce8163484_button mce8163484_inc",
    "cols": "mce8163484_cols",
    "edit": "mc70832d4a_button mce8163484_button mce8163484_edit"
});
var animDur = "0.3s";
var tools = "mce8163484_tools";
var toolsHide = "mce8163484_tools mce8163484_toolsHide";
var setting = "mce8163484_setting";
var show = "mce8163484_show";
var label = "mce8163484_label";
var control = "mce8163484_control";
var button = "mc70832d4a_button mce8163484_button";
var s0 = "mc70832d4a_button mce8163484_button mce8163484_s0";
var s1 = "mc70832d4a_button mce8163484_button mce8163484_s1";
var s2 = "mc70832d4a_button mce8163484_button mce8163484_s2";
var s3 = "mc70832d4a_button mce8163484_button mce8163484_s3";
var s4 = "mc70832d4a_button mce8163484_button mce8163484_s4";
var s5 = "mc70832d4a_button mce8163484_button mce8163484_s5";
var selected = "mce8163484_selected";
var s0Selected = "mc70832d4a_button mce8163484_button mce8163484_s0 mce8163484_selected mce8163484_s0Selected";
var s1Selected = "mc70832d4a_button mce8163484_button mce8163484_s1 mce8163484_selected mce8163484_s1Selected";
var s2Selected = "mc70832d4a_button mce8163484_button mce8163484_s2 mce8163484_selected mce8163484_s2Selected";
var s3Selected = "mc70832d4a_button mce8163484_button mce8163484_s3 mce8163484_selected mce8163484_s3Selected";
var s4Selected = "mc70832d4a_button mce8163484_button mce8163484_s4 mce8163484_selected mce8163484_s4Selected";
var s5Selected = "mc70832d4a_button mce8163484_button mce8163484_s5 mce8163484_selected mce8163484_s5Selected";
var font = "mce8163484_font";
var range = "mce8163484_range";
var rangeHide = "mce8163484_range mce8163484_rangeHide";
var dec = "mc70832d4a_button mce8163484_button mce8163484_dec";
var inc = "mc70832d4a_button mce8163484_button mce8163484_inc";
var cols = "mce8163484_cols";
var edit = "mc70832d4a_button mce8163484_button mce8163484_edit";

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tooltip */
/* unused harmony export s0 */
/* unused harmony export s1 */
/* unused harmony export s2 */
/* unused harmony export s3 */
/* unused harmony export s4 */
/* unused harmony export s5 */
/* harmony default export */ __webpack_exports__["a"] = ({
    "tooltip": "mcc875d4e3_tooltip",
    "s0": "mcc875d4e3_tooltip mcc875d4e3_s0",
    "s1": "mcc875d4e3_tooltip mcc875d4e3_s1",
    "s2": "mcc875d4e3_tooltip mcc875d4e3_s2",
    "s3": "mcc875d4e3_tooltip mcc875d4e3_s3",
    "s4": "mcc875d4e3_tooltip mcc875d4e3_s4",
    "s5": "mcc875d4e3_tooltip mcc875d4e3_s5"
});
var tooltip = "mcc875d4e3_tooltip";
var s0 = "mcc875d4e3_tooltip mcc875d4e3_s0";
var s1 = "mcc875d4e3_tooltip mcc875d4e3_s1";
var s2 = "mcc875d4e3_tooltip mcc875d4e3_s2";
var s3 = "mcc875d4e3_tooltip mcc875d4e3_s3";
var s4 = "mcc875d4e3_tooltip mcc875d4e3_s4";
var s5 = "mcc875d4e3_tooltip mcc875d4e3_s5";

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>quill</title>\n<path d=\"M0 32c4-12 14.469-32 32-32-8.219 6.594-12 22-18 22s-6 0-6 0l-6 10h-2z\"></path>\n</svg>\n"

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_animResolve__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_css__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__title__ = __webpack_require__(37);








const modals = { title: __WEBPACK_IMPORTED_MODULE_4__title__["a" /* default */] };
const hasClose = [];

/* harmony default export */ __webpack_exports__["a"] = ({
    onbeforeremove: vnode => Promise.all([Object(__WEBPACK_IMPORTED_MODULE_2__lib_animResolve__["a" /* default */])(vnode.dom, __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].modalOut), Object(__WEBPACK_IMPORTED_MODULE_2__lib_animResolve__["a" /* default */])(vnode.state.contentVnode.dom, __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].contentOut)]),
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].modalIn }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].contentIn,
        oncreate: contentVnode => {
            vnode.state.contentVnode = contentVnode;
        }
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()(modals[__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].modal]), hasClose.indexOf(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].modal) > -1 ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].close,
        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLOSE MODAL");
        }
    }, "🗙") : null))
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export animDur */
/* unused harmony export modal */
/* unused harmony export modalIn */
/* unused harmony export modalOut */
/* unused harmony export content */
/* unused harmony export contentIn */
/* unused harmony export contentOut */
/* unused harmony export close */
/* harmony default export */ __webpack_exports__["a"] = ({
    "animDur": "0.3s",
    "modal": "mcb0630254_modal",
    "modalIn": "mcb0630254_modal mcb0630254_modalIn",
    "modalOut": "mcb0630254_modal mcb0630254_modalOut",
    "content": "mcb0630254_content",
    "contentIn": "mcb0630254_content mcb0630254_contentIn",
    "contentOut": "mcb0630254_content mcb0630254_contentOut",
    "close": "mcb0630254_close"
});
var animDur = "0.3s";
var modal = "mcb0630254_modal";
var modalIn = "mcb0630254_modal mcb0630254_modalIn";
var modalOut = "mcb0630254_modal mcb0630254_modalOut";
var content = "mcb0630254_content";
var contentIn = "mcb0630254_content mcb0630254_contentIn";
var contentOut = "mcb0630254_content mcb0630254_contentOut";
var close = "mcb0630254_close";

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__title_css__ = __webpack_require__(38);






/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("form", {
        onsubmit: e => {
            e.preventDefault();

            if (!vnode.state.value) {
                return;
            }

            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("ADD TITLE MODAL", vnode.state.value);
        }
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("input", {
        value: vnode.state.value,
        placeholder: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.title,
        class: __WEBPACK_IMPORTED_MODULE_2__title_css__["a" /* default */].input,
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            vnode.state.value = v;
        }),
        oncreate: inputVnode => {
            inputVnode.dom.focus();
        }
    }), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__title_css__["a" /* default */].buttons }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        type: "submit",
        class: __WEBPACK_IMPORTED_MODULE_2__title_css__["a" /* default */].add
    }, "add title"), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__title_css__["a" /* default */].cancel,
        onclick: e => {
            e.preventDefault();

            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLOSE MODAL");
        }
    }, "cancel")))
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export label */
/* unused harmony export input */
/* unused harmony export buttons */
/* unused harmony export add */
/* unused harmony export cancel */
/* harmony default export */ __webpack_exports__["a"] = ({
    "label": "mc04421772_label",
    "input": "mc04421772_input",
    "buttons": "mc04421772_buttons",
    "add": "mc70832d4a_button mc04421772_add",
    "cancel": "mc70832d4a_button mc04421772_cancel"
});
var label = "mc04421772_label";
var input = "mc04421772_input";
var buttons = "mc04421772_buttons";
var add = "mc70832d4a_button mc04421772_add";
var cancel = "mc70832d4a_button mc04421772_cancel";

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>github</title>\n<path d=\"M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z\"></path>\n</svg>\n"

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit__ = __webpack_require__(42);







function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

/* harmony default export */ __webpack_exports__["a"] = ({
    oninit: () => {
        // if(state.song.untitled) {
        //     state.action("OPEN TITLE MODAL");
        // }
    },
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lyredit }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].edit ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lyricsEdit : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lyrics,
        style: {
            fontSize: `${__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size}em`,
            columnCount: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count
        }
    }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.lyrics.map((part, idx) => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("p", {
        id: part.hash,
        class: [__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].selected === idx ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lineSelected : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].line, part.style ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */][`s${part.style.idx}`] : null].join(" "),

        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLICK LYRIC", idx);
        }
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust(addBr(part.text))))), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].edit ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_3__edit__["a" /* default */]) : null)
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export animDur */
/* unused harmony export lyredit */
/* unused harmony export lyrics */
/* unused harmony export lyricsEdit */
/* unused harmony export line */
/* unused harmony export lineSelected */
/* unused harmony export s0 */
/* unused harmony export s1 */
/* unused harmony export s2 */
/* unused harmony export s3 */
/* unused harmony export s4 */
/* unused harmony export s5 */
/* harmony default export */ __webpack_exports__["a"] = ({
    "animDur": "0.3s",
    "lyredit": "mc9673f5d0_lyredit",
    "lyrics": "mc9673f5d0_lyrics",
    "lyricsEdit": "mc9673f5d0_lyrics mc9673f5d0_lyricsEdit",
    "line": "mc9673f5d0_line",
    "lineSelected": "mc9673f5d0_line mc9673f5d0_lineSelected",
    "s0": "mc9673f5d0_line mc9673f5d0_s0",
    "s1": "mc9673f5d0_line mc9673f5d0_s1",
    "s2": "mc9673f5d0_line mc9673f5d0_s2",
    "s3": "mc9673f5d0_line mc9673f5d0_s3",
    "s4": "mc9673f5d0_line mc9673f5d0_s4",
    "s5": "mc9673f5d0_line mc9673f5d0_s5"
});
var animDur = "0.3s";
var lyredit = "mc9673f5d0_lyredit";
var lyrics = "mc9673f5d0_lyrics";
var lyricsEdit = "mc9673f5d0_lyrics mc9673f5d0_lyricsEdit";
var line = "mc9673f5d0_line";
var lineSelected = "mc9673f5d0_line mc9673f5d0_lineSelected";
var s0 = "mc9673f5d0_line mc9673f5d0_s0";
var s1 = "mc9673f5d0_line mc9673f5d0_s1";
var s2 = "mc9673f5d0_line mc9673f5d0_s2";
var s3 = "mc9673f5d0_line mc9673f5d0_s3";
var s4 = "mc9673f5d0_line mc9673f5d0_s4";
var s5 = "mc9673f5d0_line mc9673f5d0_s5";

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_css__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_animResolve__ = __webpack_require__(3);







/* harmony default export */ __webpack_exports__["a"] = ({
    onbeforeremove: vnode => Object(__WEBPACK_IMPORTED_MODULE_3__lib_animResolve__["a" /* default */])(vnode.dom, __WEBPACK_IMPORTED_MODULE_2__edit_css__["a" /* default */].editOut),
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__edit_css__["a" /* default */].editIn }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("textarea", {
        class: __WEBPACK_IMPORTED_MODULE_2__edit_css__["a" /* default */].textarea,
        value: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.lyricString,
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.lyricString = v;
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("UPDATE PARSED LYRICS");
        })
    }))
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export animDur */
/* unused harmony export edit */
/* unused harmony export editIn */
/* unused harmony export editOut */
/* unused harmony export textarea */
/* harmony default export */ __webpack_exports__["a"] = ({
    "animDur": "0.3s",
    "edit": "mc7d4b81c4_edit",
    "editIn": "mc7d4b81c4_edit mc7d4b81c4_editIn",
    "editOut": "mc7d4b81c4_edit mc7d4b81c4_editOut",
    "textarea": "mc7d4b81c4_textarea"
});
var animDur = "0.3s";
var edit = "mc7d4b81c4_edit";
var editIn = "mc7d4b81c4_edit mc7d4b81c4_editIn";
var editOut = "mc7d4b81c4_edit mc7d4b81c4_editOut";
var textarea = "mc7d4b81c4_textarea";

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(45);






/* harmony default export */ __webpack_exports__["a"] = ({
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].error }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h1", __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].error), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].home,
        href: "/",
        oncreate: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.link
    }, "return to home"))
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fontSerif */
/* unused harmony export error */
/* harmony default export */ __webpack_exports__["a"] = ({
    "fontSerif": "'Slabo 27px', serif",
    "error": "mc1fc74cfc_error"
});
var fontSerif = "'Slabo 27px', serif";
var error = "mc1fc74cfc_error";

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state_db__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_css__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__list__ = __webpack_require__(48);










/* harmony default export */ __webpack_exports__["a"] = ({
    oninit: vnode => {
        vnode.state.timestamp = __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].timestamp();
        vnode.state.defaultSongs = __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].get("songs?default=true");
        vnode.state.customSongs = __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].get("songs?default=undefined");
    },
    onbeforeupdate: vnode => {
        if (vnode.state.timestamp !== __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].timestamp()) {
            vnode.state.timestamp = __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].timestamp();
            vnode.state.defaultSongs = __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].get("songs?default=true");
            vnode.state.customSongs = __WEBPACK_IMPORTED_MODULE_2__state_db__["a" /* default */].get("songs?default=undefined");

            return true;
        }
    },
    view: vnode => [__WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].home }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].logoAndType }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust(__WEBPACK_IMPORTED_MODULE_4__icons_lyrite_logo_svg___default.a), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].logoType }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h1", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].title }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].appName), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h2", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].subTitle }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].tagline))), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].center }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].dash }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("textarea", {
        class: vnode.state.focused ? __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].textareaFocused : __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].textarea,
        value: vnode.state.lyricString,
        placeholder: vnode.state.hidePlaceholder ? "" : "paste or drop lyrics",
        onfocus: () => {
            vnode.state.focused = true;
            vnode.state.hidePlaceholder = true;
        },
        onblur: () => {
            vnode.state.hidePlaceholder = false;
        },
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            vnode.state.lyricString = v;
            vnode.state.loadable = v.length;
        })
    })), vnode.state.loadable ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].btnWrap }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].loadBtn,
        onclick: () => {
            let slug = __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("IMPORT SONG LYRICS", {
                lyricString: vnode.state.lyricString,
                userSong: true
            });

            delete vnode.state.textarea;
            delete vnode.state.load;

            return __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.set(slug);
        }
    }, "load song")) : null),

    // loaded songs list
    Object.keys(vnode.state.customSongs).length ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_5__list__["a" /* default */], { songs: vnode.state.customSongs, header: "your songs" }) : null,

    // loaded songs list
    Object.keys(vnode.state.defaultSongs).length ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_5__list__["a" /* default */], { songs: vnode.state.defaultSongs, header: "default songs" }) : null)]
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fontSans */
/* unused harmony export fontSerif */
/* unused harmony export animDur */
/* unused harmony export home */
/* unused harmony export logoAndType */
/* unused harmony export title */
/* unused harmony export subTitle */
/* unused harmony export center */
/* unused harmony export dash */
/* unused harmony export textarea */
/* unused harmony export textareaFocused */
/* unused harmony export btnWrap */
/* unused harmony export loadBtn */
/* harmony default export */ __webpack_exports__["a"] = ({
    "fontSans": "Raleway, sans-serif",
    "fontSerif": "'Slabo 27px', serif",
    "animDur": "0.3s",
    "home": "mc9f90d7fb_home",
    "logoAndType": "mc9f90d7fb_logoAndType",
    "title": "mc70832d4a_title mc9f90d7fb_title",
    "subTitle": "mc9f90d7fb_subTitle",
    "center": "mc9f90d7fb_center",
    "dash": "mc9f90d7fb_dash",
    "textarea": "mc9f90d7fb_textarea",
    "textareaFocused": "mc9f90d7fb_textarea mc9f90d7fb_textareaFocused",
    "btnWrap": "mc9f90d7fb_btnWrap",
    "loadBtn": "mc70832d4a_button mc9f90d7fb_loadBtn"
});
var fontSans = "Raleway, sans-serif";
var fontSerif = "'Slabo 27px', serif";
var animDur = "0.3s";
var home = "mc9f90d7fb_home";
var logoAndType = "mc9f90d7fb_logoAndType";
var title = "mc70832d4a_title mc9f90d7fb_title";
var subTitle = "mc9f90d7fb_subTitle";
var center = "mc9f90d7fb_center";
var dash = "mc9f90d7fb_dash";
var textarea = "mc9f90d7fb_textarea";
var textareaFocused = "mc9f90d7fb_textarea mc9f90d7fb_textareaFocused";
var btnWrap = "mc9f90d7fb_btnWrap";
var loadBtn = "mc70832d4a_button mc9f90d7fb_loadBtn";

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_css__ = __webpack_require__(49);






/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__list_css__["a" /* default */].list }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h3", vnode.attrs.header), Object.keys(vnode.attrs.songs).map(slug => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        oncreate: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.link,
        href: `/${vnode.attrs.songs[slug].slug}`
    }, vnode.attrs.songs[slug].title, vnode.attrs.songs[slug].artist ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("span", " - ", vnode.attrs.songs[slug].artist) : null), vnode.attrs.songs[slug].userSong ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("DELETE SONG BY SLUG", slug);
        },
        "aria-label": "delete"
    }, "🗙") : null)))
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fontSans */
/* unused harmony export fontSerif */
/* unused harmony export animDur */
/* unused harmony export list */
/* harmony default export */ __webpack_exports__["a"] = ({
    "fontSans": "Raleway, sans-serif",
    "fontSerif": "'Slabo 27px', serif",
    "animDur": "0.3s",
    "list": "mcb48e5add_list"
});
var fontSans = "Raleway, sans-serif";
var fontSerif = "'Slabo 27px', serif";
var animDur = "0.3s";
var list = "mcb48e5add_list";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map