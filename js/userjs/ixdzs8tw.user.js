// ==UserScript==
// @name         ixdzs8.tw
// @namespace    pl816098
// @version      1.2.8
// @description  自用
// @author       paul
// @match        https://ixdzs8.com/read/*/*.html
// @match        https://ixdzs8.com/read/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ixdzs8.tw
// @license      MIT
// @grant        GM_addStyle
// @grant        window.close
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://update.greasyfork.org/scripts/484505/ixdzs8tw.user.js
// @updateURL    https://update.greasyfork.org/scripts/484505/ixdzs8tw.meta.js
// ==/UserScript==
let ele = [];
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
let url = window.location.href;
let next_page_url = document.querySelector(
  "body > div.page-d.page-turn > div > a.chapter-paging.chapter-next"
).href;
let pattern = {
  book: {
    pattern:
      /^(https?:\/\/)(ixdzs8\.[a-zA-Z]{1,3}\/read\/[0-9]+\/(?!end)p[0-9]*\.html)$/gm,
    is: (url) => {
      if (pattern.book.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  info: {
    pattern: /^(https?:\/\/)(ixdzs8\.[a-zA-Z]{1,3}\/read\/[0-9]+\/)$/gm,
    is: (url) => {
      if (pattern.info.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  end: {
    pattern:
      /^(https?:\/\/)(ixdzs8\.[a-zA-Z]{1,3}\/read\/[0-9]+\/end\.html)$/gm,
    is: (url) => {
      if (pattern.end.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
};

if (pattern.book.is(url)) {
  ele = [
    "#page-id3",
    "#page-toolbar",
    "#page > article > section > p:nth-child(1)",
  ];
  ele.forEach((ele) => {
    if (document.querySelector(ele)) {
      document.querySelector(ele).remove();
    }
  });
  _GM_addStyle(`
    .page-content{
max-width: none;
padding: 10px 15px;
transform: translateX(0px);
background: #ffffff!important;
}
`);
}
if (pattern.end.is(url) || pattern.end.is(next_page_url)) {
  // console.log("end")
  if (pattern.end.is(next_page_url)) {
    document.addEventListener("keydown", function (e) {
      if (!e.repeat) {
        switch (true) {
          case e.key === "ArrowRight": {
            // console.log('(e.key === "ArrowRight") === true');
            window.close();
            break;
          }
          default: {
            // console.log("e: ", e);
            break;
          }
        }
      }
    });
  }
  if (pattern.end.is(url)) {
    window.close();
  }
}
if (pattern.info.test(url)) {
  document.querySelector("#intro").click();
}
