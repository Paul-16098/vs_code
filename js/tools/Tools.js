/** @format */

// ==UserScript==
// @name         Tools
// @namespace    pl816098
// @description  paul Tools
// @version      1.1.4
// @match        *://*/*
// @author       paul
// @license      MIT
// @grant        unsafeWindow
// ==/UserScript==

const _unsafeWindow =
  typeof unsafeWindow === "undefined" ? window : unsafeWindow; //兼容 ios userscripts 的寫法
function set_gm() {
  set_gm: {
    var _GM_xmlhttpRequest,
      _GM_registerMenuCommand,
      _GM_notification,
      _GM_addStyle,
      _GM_openInTab,
      _GM_info,
      _GM_setClipboard;
    GM_xmlhttpRequest: {
      if (typeof GM_xmlhttpRequest !== "undefined") {
        _GM_xmlhttpRequest = GM_xmlhttpRequest;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.xmlHttpRequest !== "undefined"
      ) {
        _GM_xmlhttpRequest = GM.xmlHttpRequest;
      } else {
        _GM_xmlhttpRequest = (f) => {
          fetch(f.url, {
            method: f.method || "GET",
            body: f.data,
            headers: f.headers,
          })
            .then((response) => response.text())
            .then((data) => {
              f.onload && f.onload({ response: data });
            })
            .catch(f.onerror && f.onerror());
        };
      }
    }
    GM_registerMenuCommand: {
      if (typeof GM_registerMenuCommand !== "undefined") {
        _GM_registerMenuCommand = GM_registerMenuCommand;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.registerMenuCommand !== "undefined"
      ) {
        _GM_registerMenuCommand = GM.registerMenuCommand;
      } else {
        _GM_registerMenuCommand = (s, f) => {
          debug(s);
          debug(f);
        };
      }
    }
    GM_info: {
      if (typeof GM_info !== "undefined") {
        _GM_info = GM_info;
      } else if (typeof GM !== "undefined" && typeof GM.info !== "undefined") {
        _GM_info = GM.info;
      } else {
        _GM_info = { script: {} };
      }
    }
    GM_notification: {
      if (typeof GM_notification !== "undefined") {
        _GM_notification = GM_notification;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.notification !== "undefined"
      ) {
        _GM_notification = GM.notification;
      } else {
        _GM_notification = (s) => {
          showTips(String(s.text || s));
        };
      }
    }
    GM_openInTab: {
      if (typeof GM_openInTab !== "undefined") {
        _GM_openInTab = GM_openInTab;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.openInTab !== "undefined"
      ) {
        _GM_openInTab = GM.openInTab;
      } else {
        _GM_openInTab = (s, t) => {
          window.open(s);
          debug(t);
        };
      }
    }
    GM_addStyle: {
      if (typeof GM_addStyle !== "undefined") {
        _GM_addStyle = GM_addStyle;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.addStyle !== "undefined"
      ) {
        _GM_addStyle = GM.addStyle;
      } else {
        _GM_addStyle = (cssStr = null) => {
          let styleEle = document.createElement("style");
          styleEle.classList.add("_GM_addStyle");
          styleEle.innerHTML = cssStr;
          document.head.appendChild(styleEle);
          return styleEle;
        };
      }
    }
    GM_setClipboard: {
      if (typeof GM_setClipboard !== "undefined") {
        _GM_setClipboard = GM_setClipboard;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.setClipboard !== "undefined"
      ) {
        _GM_setClipboard = GM.setClipboard;
      } else {
        _GM_setClipboard = (s, i) => {
          debug(s);
          debug(i);
        };
      }
    }
  }
}

_unsafeWindow.Tools.debug = function (str, title = "INFO", type = "log") {
  if (
    !(type === "log" || type === "info" || type === "error" || type === "warn")
  ) {
    console.warn("錯誤: type != log || info || warn || error but = " + type);
  }
  console[type](
    `%c ${title}:\n`,
    "color: white;font-size: large;font-weight: bold;background-color: black;",
    str
  );
};
/**
 * a JSDoc
 * @date 2023/12/20 - 上午11:25:47
 * @author pl816098
 *
 * @type {number}
 */
var VERSION = 1.6;
_unsafeWindow.lang_data = [
  {
    name: "English",
    match: ["en", "EN"],
    lang: {
      "Unidentified version":
        "Loaded an unidentified version of Tools, overwriting...",
      "Load the updated version":
        "A newer version of Tools(#$0#) has been loaded. Aborted loading version #$1#.",
      "Old version loaded":
        "Loaded old version of CKTools (#$0#), upgrading to the new version #$1#.",
      "been deprecated":
        '"makeDom" has been deprecated. Redirecting to "domHelper"...',
      unknown: "unknown: #$0#",
      "Param must be func!": "Param must be func!",
      "Param must be a func!": "Param must be a func!",
      ERROR: "ERROR: #$0#",
      "Start Drag": "DRAG: Start Drag",
      tf_err: "tf must be a boolean true or false, but it is #$0#;",
    },
  },
  {
    name: "中文",
    match: ["zh-TW", "zh-tw", "zh-HK", "zh-hk", "zh-CN", "zh-cn"],
    lang: {
      "Unidentified version": "已加載無法識別版本的 Tools(#$0#),正在覆蓋...",
      "Load the updated version":
        "已加載更新版本的 Tools(#$0#).終止加載版本#$1#.",
      "Old version loaded": "已加載舊版 Tools(#$0#),正在升級至新版 #$1#.",
      "been deprecated": '"makeDom"已被棄用.正在重定向到"domHelper"...',
      unknown: "未知: #$0#",
      "Param must be func!": "參數必須是函數!",
      "Param must be a func!": "參數必須是一個函數!",
      ERROR: "錯誤: #$0#",
      "Start Drag": "拖動:開始拖動",
      tf_err: "tf必須是布爾值true或false,但它是 #$0#;",
    },
  },
];
_unsafeWindow.set_i18n = function () {
  var lang =
    navigator.userAgent.indexOf("Chrome") !== -1 ||
    navigator.userAgent.indexOf("Firefox") !== -1
      ? navigator.language
      : navigator.userLanguage;
  _unsafeWindow.langList = {};
  lang_data.forEach((lang) => {
    langList[lang.match[0]] = lang.name;
  });
  _unsafeWindow.i18nData = lang_data[0].lang;
  for (let i = 0; i < lang_data.length; i++) {
    _unsafeWindow.for_lang = lang_data[i];
    if (for_lang && for_lang.match.indexOf(lang) !== -1) {
      i18nData = for_lang.lang;
      break;
    }
  }

  _unsafeWindow.i18n = function (name = "lang", param = []) {
    if (name === "lang") {
      debug(`${for_lang.name} : ${lang}`, "lang");
      return `${for_lang.name} : ${lang}`;
    }
    try {
      if (param === undefined || param.length == 0) {
        return i18nData[name];
      } else if (!(param === undefined || param.length == 0)) {
        return i18nData[name].replace(
          /#\$([0-9]){1,}#/g,
          (_, index) => param[index]
        );
      } else {
        debug(e, "ERROR", "error");
        return name;
      }
    } catch (e) {
      debug(e, "ERROR", "error");
      return name;
    }
  };
};
set_i18n();
if ("Tools" in window) {
  if (!window.Tools.ver) {
    console.warn(i18n("Unidentified version"));
  } else if (window.Tools.ver > VERSION) {
    throw new Error(
      i18n("Load the updated version", [window.Tools.ver, VERSION])
    );
  } else {
    console.warn(i18n("Old version loaded", [window.Tools.ver, VERSION]));
  }
}
class Tools {
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   *
   * @static
   * @type {number}
   */
  static ver = VERSION;

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   *
   * @static
   * @param {*} q
   * @param {*} [base=document]
   * @returns {*}
   */
  static get(q, base = document) {
    return base.querySelector(q);
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   *
   * @static
   * @param {*} q
   * @param {*} [base=document]
   * @returns {{}}
   */
  static getAll(q, base = document) {
    return [...base.querySelectorAll(q)];
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   */
  static domHelper(options = {}, compatibleParm2 = {}) {
    let tagName = "div";
    if (typeof options == "string") {
      /* Migrate from version 1 */
      tagName = options;
      /* Migrate from makeDom */
      if (compatibleParm2.constructor.name == "Object")
        options = compatibleParm2;
      else if (compatibleParm2.constructor.name == "AsyncFunction")
        options = {
          initAsync: compatibleParm2,
        };
      else if (compatibleParm2.constructor.name == "Function")
        options = {
          init: compatibleParm2,
        };
      else options = {};
    }
    if (options.listeners) {
      /* Migrate from version 1 */
      if (!options.on) options.on = {};
      Object.assign(options.on, options.listeners);
    }
    if (options.classnames) {
      /* Migrate from version 1 */
      if (!options.classList) options.classList = [];
      options.classList.concat(options.classnames);
    }
    if (options.tag) tagName = options.tag;
    let el;
    if (options.from) {
      if (options.from instanceof HTMLElement) {
        el = options.from;
      } else if (typeof options.from == "string") {
        let els = domHelper(tagName, {
          html: options.from,
        });
        if (els.childElementCount === 0) {
          el = document.createElement(tagName);
        } else if (els.childElementCount === 1) {
          el = els.firstElementChild;
        } else {
          el = els;
        }
      }
    } else if (options.query) {
      const query = document.querySelector(options.query);
      if (query) el = query;
      else return null;
    } else el = document.createElement(tagName);
    if (options.id) el.id = options.id;
    if (options.html) el.innerHTML = options.html;
    if (options.text) el.innerText = options.text;
    if (options.attr) {
      for (const ak of Object.keys(options.attr)) {
        el.setAttribute(ak, options.attr[ak]);
      }
    }
    if (options.cssText) el.style.cssText = options.cssText;
    if (options.style) Object.assign(el.style, options.style);
    if (options.css) Object.assign(el.style, options.css);
    if (options.childs) {
      if (options.childs instanceof Array)
        options.childs
          .filter((el) => !!el)
          .forEach((child) => {
            if (child instanceof HTMLElement) el.appendChild(child);
            else if (
              child.hasOwnProperty("type") &&
              child.hasOwnProperty("content")
            ) {
              switch (child.type) {
                case "html":
                  {
                    arguments.callee("span", {
                      from: child.content,
                      append: el,
                    });
                  }
                  break;
                case "style":
                  {
                    const scoped =
                      child.hasOwnProperty("scoped") && !!child.scoped;
                    arguments.callee("style", {
                      html: child.content,
                      append: el,
                      attr: {
                        scoped,
                      },
                    });
                  }
                  break;
                default:
                  el.appendChild(arguments.callee(child.type, child.content));
              }
            } else el.appendChild(document.createTextNode(child));
          });
      else if (options.childs instanceof HTMLElement)
        el.appendChild(options.childs);
      else el.appendChild(document.createTextNode(options.childs));
    }
    if (options.classlist) {
      if (options.classlist instanceof Array)
        options.classlist.forEach((classname) => {
          el.classList.add(classname);
        });
      else el.classList.add(...options.classlist.split(" "));
    }
    if (options.classList) {
      if (options.classList instanceof Array)
        options.classList.forEach((classname) => {
          el.classList.add(classname);
        });
      else el.classList.add(...options.classList.split(" "));
    }
    if (options.on) {
      for (let listenerName of Object.keys(options.on)) {
        el.addEventListener(listenerName, options.on[listenerName]);
      }
    }
    if (options.off) {
      for (let listenerName of Object.keys(options.of)) {
        el.removeEventListener(listenerName, options.off[listenerName]);
      }
    }
    if (options.bind) {
      const serverName = "$bindingserver" + Math.floor(Math.random() * 100000);
      const bindings = Tools.deepClone(options.bind);
      const unbindProperty = (prop) => (bindings[prop] = undefined);
      const unbindAllProperties = () => el[serverName].disconnect();
      el[serverName] = new MutationObserver((mutations) => {
        for (const mutation in mutations) {
          if (bindings.hasOwnProperty(mutation.attributeName)) {
            try {
              bindings[mutation.attributeName]({
                target: mutation.target,
                attributeName: mutation.attributeName,
                attributeNamespace: mutation.attributeNamespace,
                oldValue: mutation.oldValue,
                newValue:
                  mutation.target.getAttribute(mutation.attributeName) ||
                  undefined,
                unbind: () => unbindProperty(mutation.attributeName),
                stopListen: () => (
                  unbindAllProperties(), (el[serverName] = undefined)
                ),
              });
            } catch (e) {}
          }
        }
      });
      el.addEventListener(
        "DOMNodeRemoved",
        () => (unbindAllProperties(), (el[serverName] = undefined))
      );
      el[serverName].observe(el, {
        attributes: true,
        attributeOldValue: true,
      });
    }
    if (options.append && options.append instanceof HTMLElement) {
      options.append.appendChild(el);
    }
    if (options.insertBefore && insertBefore instanceof HTMLElement) {
      options.insertBefore.parentNode.insertBefore(el, options.insertBefore);
    }
    if (options.insertAfter && insertAfter instanceof HTMLElement) {
      options.insertAfter.parentNode.insertAfter(el, options.insertAfter);
    }
    if (options.init && options.init instanceof Function) {
      options.init(el);
    }
    if (options.initAsync && options.initAsync instanceof Function) {
      return options.initAsync(el).then(() => el);
    }
    return el;
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   *
   * @static
   * @returns {*}
   */
  static makeDom() {
    console.warn(i18n("been deprecated"));
    return Tools.domHelper(...arguments);
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:47
   * @author pl816098
   *
   * @static
   * @param {*} item
   * @returns {DOMItem}
   */
  static addDom(item) {
    const make = (tag = "div") => document.createElement(tag);
    const txt = (it = "") => document.createTextNode(it);
    class DOMItem {
      constructor(it = "") {
        this.setItem(it);
      }

      setItem(it = "") {
        if (typeof it === "string" || it instanceof String) {
          this.el = txt(it);
        } else if (it instanceof HTMLElement) {
          this.el = it;
        } else this.el = txt(it.toString());
        if (!this.target) this.target = document.body;
        this.mode = "child";
        return this;
      }

      inside(q = document.body) {
        this.mode = "child";
        if (q instanceof HTMLElement) {
          this.target = q;
        } else if (typeof q === "string" || q instanceof String) {
          const ql = this.target.querySelector(q);
          if (ql) this.target = ql;
        }
        return this;
      }

      after(a = null) {
        this.mode = "child-after";
        if (a instanceof HTMLElement) {
          this.after = a;
        } else if (typeof a === "string" || a instanceof String) {
          const al = this.target.querySelector(a);
          if (al) this.after = al;
        }
        return this;
      }

      before(a = null) {
        this.mode = "child-before";
        if (a instanceof HTMLElement) {
          this.before = a;
        } else if (typeof a === "string" || a instanceof String) {
          const al = this.target.querySelector(a);
          if (al) this.before = al;
        }
        return this;
      }

      done() {
        switch (this.mode) {
          case "child":
            {
              if (this.el && this.target) this.target.appendChild(this.el);
            }
            break;
          case "child-before":
            {
              if (this.el && this.target && this.before)
                this.target.insertBefore(this.el, this.before);
            }
            break;
          case "child-after":
            {
              if (this.el && this.target && this.after)
                this.target.insertBefore(this.el, this.after.nextSibling);
            }
            break;
        }
      }
    }
    return new DOMItem(item);
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} obj
   * @returns {{}}
   */
  static deepClone(obj) {
    let newObject = {};
    if (Array.isArray(obj)) {
      newObject = [];
      for (let i = 0; i < obj.length; i++) {
        newObject.push(Tools.deepClone(obj[i]));
      }
      return newObject;
    }
    Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object") {
        newObject[key] = Tools.deepClone(obj[key]);
      } else {
        newObject[key] = obj[key];
      }
    });
    return newObject;
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @returns {{}}
   */
  static getAllCookie() {
    let list = {};

    let cookie = document.cookie;
    // 解析 cookie 字符串并存储到 list 对象中

    let cookiePairs = cookie.split(";");
    for (let pair of cookiePairs) {
      let [key, value] = pair.split("=");
      list[key.trim()] = value.trim();
    }
    return list;
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} name
   * @returns {*}
   */
  static getCookie(name) {
    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @returns {*}
   */
  static clearAllCookies() {
    return document.cookie
      .split(";")
      .forEach(
        (cookie) =>
          (document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
      );
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @returns {{}}
   */
  static getAllUrlParams() {
    var params = {};

    var queryString = window.location.search.substring(1);

    var urlParams = new URLSearchParams(queryString);

    for (var pair of urlParams.entries()) {
      var key = pair[0];
      var value = pair[1];
      params[key] = value;
    }
    return params;
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} key
   * @returns {*}
   */
  static getUrlParam(key) {
    return new URL(location.href).searchParams.get(key);
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @returns {*}
   */
  static getAllHash() {
    return location.hash;
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} ms
   * @returns {*}
   */
  static wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @async
   * @param {*} query
   * @param {*} [domparent=document]
   * @param {number} [maxRetries=20]
   * @param {number} [gagms=200]
   * @returns {unknown}
   */
  static async waitForDom(
    query,
    domparent = document,
    maxRetries = 20,
    gagms = 200
  ) {
    let i = maxRetries;
    while (--i > 0) {
      if (domparent.querySelector(query)) return true;
      await Tools.wait(gagms);
    }
    return false;
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @async
   * @param {*} q
   * @param {*} attr
   * @returns {unknown}
   */
  static async waitForAttribute(q, attr) {
    let i = 50;

    let value;
    while (--i >= 0) {
      if (attr in q && q[attr] != null) {
        value = q[attr];
        break;
      }
      await wait(100);
    }
    return value;
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @async
   * @returns {unknown}
   */
  static async waitForPageVisible() {
    if (document.hidden) return true;
    return new Promise((r) => {
      const handler = () => {
        r(true);
        document.removeEventListener("visibilitychange", handler);
      };
      document.addEventListener("visibilitychange", handler);
    });
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {string} [className="injectedStyle"]
   */
  static clearStyles(className = "injectedStyle") {
    let dom = document.querySelectorAll("style." + className);
    if (dom) [...dom].forEach((e) => e.remove());
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} s
   * @param {string} [className="injectedStyle"]
   * @param {string} [mode="append"]
   * @param {*} [injectBase=document.head]
   */
  static addStyle(
    s,
    className = "injectedStyle",
    mode = "append",
    injectBase = document.head
  ) {
    switch (mode) {
      default:
      case "append":
        break;
      case "unique":
        if (document.querySelector("style." + className)) return;
        break;
      case "update":
        Tools.clearStyles(className);
        break;
    }

    let style = document.createElement("style");
    style.classList.add(className);
    style.innerHTML = s;
    injectBase.appendChild(style);
  }
  // stackoverflow

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} func
   * @param {number} [timeout=300]
   * @returns {(...args: {}) => void}
   */
  static debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} callback
   * @param {*} limit
   * @returns {(...args: {}) => void}
   */
  static throttle(callback, limit) {
    var waiting = false;
    return function () {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(function () {
          waiting = false;
        }, limit);
      }
    };
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   *
   * @static
   * @param {*} selector
   * @param {*} text
   * @returns {*}
   */
  static domContains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
      return RegExp(text).test(element.textContent);
    });
  }
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:46
   * @author pl816098
   */
  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @static
   * @param {*} str
   * @param {*} map
   * @returns {*}
   */
  static mapReplace(str, map) {
    //reference: https://segmentfault.com/q/1010000023489916 answer-2
    const replace = ({ str, reg, replacer }) =>
      str.replace(new RegExp(reg, "g"), replacer);
    return Object.keys(map).reduce(
      (str, reg) =>
        replace({
          str,
          reg,
          replacer: map[reg],
        }),
      str
    );
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @static
   * @param {*} num
   * @param {number} [count=2]
   * @returns {*}
   */
  static padStart(num, count = 2) {
    return (("" + Math.pow(10, count)).substr(1) + num).slice(
      -1 * Math.max(count, ("" + num).length)
    );
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @static
   * @param {number} num
   * @param {number} [fix=0]
   * @returns {number}
   */
  static fixNum(num, fix = 0) {
    return Math.floor(num * Math.pow(10, fix)) / Math.pow(10, fix);
  }

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static random = class {
    static hex() {
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0")}`;
    }
    static shuffleArray(arr) {
      return arr.sort(() => 0.5 - Math.random());
    }
    static num(min, max) {
      return Math.random() * (max - min) + min;
    }
    static fromArray(arr = []) {
      return arr[Math.floor(Tools.random.num(0, arr.length))];
    }
    static from(...args) {
      return Tools.random.fromArray(args);
    }
  };

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static is = class {
    static str(s) {
      return s != null && (typeof s === "string" || s instanceof String);
    }
    static elementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    static asyncFn(fn) {
      return fn.constructor.name === "AsyncFunction";
    }
    static darkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  };

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static modal = class {
    static openModal(title = "", content) {
      Tools.modal.blockWindow();
      let modal = Tools.get("#Tools-modal");
      if (!modal) modal = Tools.modal.initModal();
      modal.setTitle(title);
      modal.setContent(content);
      modal.show();
    }
    static isModalShowing() {
      let modal = Tools.get("#Tools-modal");
      if (modal) return modal.classList.contains("show");
      else return false;
    }
    static hideModal() {
      Tools.modal.blockWindow(false);
      let modal = Tools.get("#Tools-modal");
      if (modal) modal.hide();
    }
    static initModal() {
      Tools.addStyle(
        `
				#Tools-modal{
					position: fixed;
					z-index: 99010;
					top: 50%;
					left: 50%;
					width: 300px;
					width: 30vw;
					height: 300px;
					height: 50vh;
					background: white;
					border-radius: 8px;
					padding: 12px;
					transform: translate(-50%,-50%);
					transition: all .3s;
					box-shadow: 0 2px 8px grey;
				}
				#Tools-modal.show{
					opacity: 1;
					transform: translate(-50%,-50%) scale(1);
				}
				#Tools-modal.hide{
					opacity: 0;
					pointer-events: none;
					transform: translate(-50%,-50%) scale(0.9);
				}
				.Tools-modal-title{
					font-size: large;
				}
				.Tools-modal-content{
					font-size: medium;
				}
				.Tools-modal-content>div{
					display: flex;
					margin: 6px 10px;
					flex-wrap: wrap;
					flex-direction: column;
					align-content: space-around;
					justify-content: space-between;
					align-items: center;
				}
				.Tools-toolbar-btns{
					flex: 1;
					border: none;
					background: #2196f3;
					border-radius: 3px;
					margin: 0 6px;
					padding: 3px;
					color: white;
					box-shadow: 0 2px 3px grey;
					min-width: 60px;
				}
				.Tools-toolbar-btns:hover{
					filter: brightness(0.85);
				}
				`,
        "Tools-modal-css",
        "unique"
      );
      const modal = document.createElement("div");
      modal.id = "Tools-modal";
      modal.className = "hide";

      const header = document.createElement("h2");
      header.className = "Tools-modal-title";
      modal.appendChild(header);

      modal.setTitle = (t = "") => {
        header.innerHTML = t;
      };

      const contents = document.createElement("div");
      contents.className = "Tools-modal-content";
      modal.appendChild(contents);

      modal.setContent = async (c) => {
        let ct = c;
        if (ct instanceof Function) {
          ct = await ct();
        }
        if (ct instanceof HTMLElement) {
          contents.innerHTML = "";
          contents.appendChild(ct);
          return;
        }
        if (typeof ct === "string") {
          contents.innerHTML = ct;
          return;
        }
        console.log("unknown: ", ct);
      };
      modal.addContent = async (c) => {
        let ct = c;
        if (ct instanceof Function) {
          ct = await ct();
        }
        if (ct instanceof HTMLElement) {
          contents.appendChild(ct);
          return;
        }
        if (ct instanceof String) {
          contents.innerHTML += ct;
          return;
        }
        console.log(i18n("unknown", [ct]));
      };

      modal.close = Tools.modal.closeModal;
      modal.open = Tools.modal.openModal;
      modal.show = () => {
        modal.className = "show";
      };
      modal.hide = () => {
        modal.className = "hide";
      };

      document.body.appendChild(modal);
      return modal;
    }
    static closeModal() {
      Tools.modal.blockWindow(false);
      let modal = Tools.get("#Tools-modal");
      if (modal) modal.remove();
    }
    static async alertModal(title = "", content = "", okbtn = null) {
      if (Tools.modal.isModalShowing()) {
        Tools.modal.hideModal();
        await Tools.wait(200);
      }
      Tools.modal.openModal(
        title,
        await Tools.domHelper("div", async (container) => {
          container.appendChild(
            await Tools.domHelper("div", (tip) => {
              tip.innerHTML = content;
            })
          );
          if (okbtn !== null)
            container.appendChild(
              await Tools.domHelper("div", async (btns) => {
                btns.style.display = "flex";
                btns.appendChild(
                  await Tools.domHelper("button", (btn) => {
                    btn.className = "Tools-toolbar-btns";
                    btn.innerHTML = okbtn;
                    btn.onclick = (e) => Tools.modal.hideModal();
                  })
                );
              })
            );
        })
      );
      await Tools.wait(300);
    }
    static blockWindow(block = true) {
      Tools.addStyle(
        `
				#Tools-blockWindow{
					z-index: 99005;
					display: block;
					background: #00000080;
					opacity: 0;
					transition: all .3s;
					position: fixed;
					left: 0;
					top: 0;
					width: 100vw;
					height: 100vh;
				}
				#Tools-blockWindow.hide{
					pointer-events: none;
					opacity: 0;
				}
				#Tools-blockWindow.show{
					opacity: 1;
				}
				`,
        "Tools-blockWindow-css",
        "unique"
      );
      let dom = Tools.get("#Tools-blockWindow");
      if (!dom) {
        dom = document.createElement("div");
        dom.id = "Tools-blockWindow";
        dom.className = "hide";
        document.body.appendChild(dom);
      }
      if (block) {
        dom.className = "show";
      } else {
        dom.className = "hide";
      }
    }
  };

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static EventEmitter = class {
    handlers = {};
    on(name, func) {
      if (!(func instanceof Function)) {
        throw i18n("Param must be func!");
      }
      if (!(name in this.handlers)) {
        this.handlers[name] = [];
      }
      this.handlers[name].push(func);
    }
    off(name, func) {
      if (!(func instanceof Function)) {
        throw i18n("Param must be func!");
      }
      if (name in this.handlers) {
        for (let i = 0; i < this.handlers[name].length; i++) {
          if (this.handlers[name][i] === func) {
            this.handlers[name].splice(i, 1);
            i--;
          }
        }
      }
    }
    clean(name) {
      if (name in this.handlers) {
        this.handlers[name] = [];
      }
    }
    emit(name, ...args) {
      if (name in this.handlers) {
        for (let func of this.handlers[name]) {
          try {
            func(...args);
          } catch (e) {
            console.error(i18n("ERROR", [e]));
          }
        }
      }
    }
  };

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static HoldClick = class {
    dom;
    emitter = new Tools.EventEmitter();
    downTime = 0;
    holdingTime = 250;
    mouseDown = false;

    constructor(dom, holdingTime = 250) {
      this.bind(dom);
      this.holdingTime = holdingTime;
    }

    bind(dom) {
      if (this.dom) {
        this.unregListeners();
      }
      if (dom instanceof HTMLElement) {
        this.dom = dom;
        this.initListener();
      }
    }

    onclick(func) {
      this.emitter.on("click", func);
      return this;
    }

    onhold(func) {
      this.emitter.on("hold", func);
      return this;
    }

    onup(func) {
      this.emitter.on("up", func);
      return this;
    }

    offclick(func) {
      this.emitter.off("click", func);
      return this;
    }

    offhold(func) {
      this.emitter.off("hold", func);
      return this;
    }

    offup(func) {
      this.emitter.off("up", func);
      return this;
    }

    resetCallback(name = "all") {
      const allEv = ["click", "hold", "up"];
      if (name === "all") {
        allEv.forEach((e) => this.emitter.clean(e));
      } else if (allEv.includes(name)) {
        this.emitter.clean(name);
      }
    }

    unregListeners() {
      this.dom.removeEventListener("mouseup", this.handleMouseUp.bind(this));
      this.dom.removeEventListener(
        "mousedown",
        this.handleMouseDown.bind(this)
      );
      this.dom.removeEventListener("mouseout", this.handleMouseOut.bind(this));
    }

    uninstall() {
      this.resetCallback();
      this.unregListeners();
    }

    handleMouseDown(e) {
      if (e.button !== 0 && e.button !== 1) return;
      e.preventDefault();
      this.mouseDown = true;
      this.downTime = new Date().getTime();
      setTimeout(() => {
        if (this.mouseDown) {
          console.log(this);
          this.mouseDown = false;
          this.downTime = 0;
          this.emitter.emit("hold", e);
        }
      }, this.holdingTime);
    }

    handleMouseUp(e) {
      if (e.button !== 0 && e.button !== 1) return;
      e.preventDefault();
      if (this.mouseDown) {
        this.mouseDown = false;
        const currTime = new Date().getTime();
        if (currTime - this.downTime >= this.holdingTime) {
          this.emitter.emit("hold", e);
        } else {
          this.emitter.emit("click", e);
        }
        this.downTime = 0;
      }
      this.emitter.emit("up", e);
    }

    handleMouseOut(e) {
      e.preventDefault();
      if (this.mouseDown) {
        this.mouseDown = false;
        this.downTime = 0;
        this.emitter.emit("hold", e);
      }
    }

    initListener() {
      this.dom.addEventListener("mouseup", this.handleMouseUp.bind(this));
      this.dom.addEventListener("mousedown", this.handleMouseDown.bind(this));
      this.dom.addEventListener("mouseout", this.handleMouseOut.bind(this));
    }
  };

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static dragger = class {
    static defaultHandler(val) {
      return console.log("DRAG:", val);
    }
    static async waitForDragger(waitStatus = true) {
      while (Tools.dragger.dragging !== waitStatus) await Tools.wait(10);
      return Tools.dragger;
    }
    static async regHandler(func) {
      if (!(func instanceof Function)) throw i18n("Param must be a func!");
      await Tools.dragger.waitForDragger(false);
      Tools.dragger.handler = func;
      return Tools.dragger;
    }
    static handler() {}
    static dragging = false;
    static initialDragData = {
      x: 0,
      y: 0,
    };
    static lastDragData = {
      x: 0,
      y: 0,
    };
    static startDrag(e) {
      if (Tools.dragger.dragging) return;
      Tools.dragger.dragging = true;
      console.log(Tools.dragger.initialDragData);
      Tools.dragger.initialDragData.x = e.screenX;
      Tools.dragger.initialDragData.y = e.screenY;
      Tools.dragger.lastDragData.x = e.screenX;
      Tools.dragger.lastDragData.y = e.screenY;
      document.body.addEventListener("mouseup", Tools.dragger.stopDrag);
      document.body.addEventListener("mousemove", Tools.dragger.handleDrag);
      console.info(i18n("Start Drag"));
      return Tools.dragger;
    }
    static handleDrag(e) {
      const currPos = {
        x: e.screenX,
        y: e.screenY,
      };
      const initPos = Tools.dragger.initialDragData;
      const delta = {
        x: initPos.x - currPos.x,
        y: initPos.y - currPos.y,
      };
      const lastdelta = {
        x: Tools.dragger.lastDragData.x - currPos.x,
        y: Tools.dragger.lastDragData.y - currPos.y,
      };
      Tools.dragger.lastDragData = currPos;
      Tools.dragger.handler(delta, lastdelta);
    }
    static stopDrag() {
      document.body.removeEventListener("mouseup", Tools.dragger.stopDrag);
      document.body.removeEventListener("mousemove", Tools.dragger.handleDrag);
      Tools.dragger.handler = Tools.dragger.defaultHandler;
      console.info("DRAG:", "Stop Drag");
      Tools.dragger.dragging = false;
      return Tools.dragger;
    }
  };

  /**
   * a JSDoc
   * @date 2023/12/20 - 上午11:25:45
   * @author pl816098
   *
   * @class
   */
  static GUID = class {
    static S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    static S8() {
      let S4 = Tools.GUID.S4;
      return S4() + S4();
    }
    static S16() {
      let S8 = Tools.GUID.S8;
      return S8() + S8();
    }
    static S32() {
      let S16 = Tools.GUID.S16;
      return S16() + S16();
    }
    static get_UUID(tf = true, l = "-") {
      let S4 = Tools.GUID.S4;
      let S8 = Tools.GUID.S8;
      let S32 = Tools.GUID.S32;
      if (tf == true) {
        return S8() + l + S4() + l + S4() + l + S4() + l + S8() + S4();
      } else if (tf == false) {
        return S32();
      } else {
        throw new Error(i18n("tf_err", [tf]));
      }
    }
  };
}
_unsafeWindow.Tools = Tools;
_unsafeWindow.set_gm = set_gm;
console.log(
  `if (Tools.getUrlParam('on') === 'true' || Tools.getUrlParam('on') === null) = `,
  Tools.getUrlParam("on") === "true" || Tools.getUrlParam("on") === null
);
