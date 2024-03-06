/** @format */

// ==UserScript==
// @name         Tools
// @namespace    pl816098
// @description  paul Tools
// @version      2.0.0
// @match        *://*/*
// @author       paul
// @license      MIT
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

const _unsafeWindow =
  typeof unsafeWindow === "undefined" ? window : unsafeWindow; //兼容 ios userscripts 的寫法
_unsafeWindow.debug = (str, title = "INFO", type = "log") => {
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

_unsafeWindow.set_gm = set_gm;
