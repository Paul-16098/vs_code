/** @format */

// ==UserScript==
// @name         ixdzs8.tw
// @namespace    pl816098
// @version      1.2.2
// @description  自用
// @author       paul
// @match        https://ixdzs8.tw/read/*/*.html
// @match        https://ixdzs8.tw/read/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ixdzs8.tw
// @license      MIT
// @grant        GM_addStyle
// @grant        window.close
// @downloadURL https://update.greasyfork.org/scripts/484505/ixdzs8tw.user.js
// @updateURL https://update.greasyfork.org/scripts/484505/ixdzs8tw.meta.js
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
  GM_addStyle: {
    if (typeof GM_addStyle !== "undefined") {
      _GM_addStyle = GM_addStyle;
    } else if (
      typeof GM !== "undefined" &&
      typeof GM.addStyle !== "undefined"
    ) {
      _GM_addStyle = GM.addStyle;
    } else {
      _GM_addStyle = (cssStr) => {
        let styleEle = document.createElement("style");
        styleEle.innerHTML = cssStr;
        document.head.appendChild(styleEle);
        return styleEle;
      };
    }
  }
}
let url = window.location.href;
let pattern = {
  book: {
    pattern:
      /^(https?:\/\/)(ixdzs8\.tw\/read\/[0-9]*\/(?!end)p[0-9]*\.html)$/gm,
    is: (url) => {
      if (pattern.book.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  info: {
    pattern: /^(https?:\/\/)(ixdzs8\.tw\/read\/[0-9]*\/)$/gm,
    is: (url) => {
      if (pattern.info.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  end: {
    pattern: /^(https?:\/\/)(ixdzs8\.tw\/read\/[0-9]*\/end\.html)$/gm,
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
  document.querySelector("#page-id3").remove();
  document.querySelector("#page-toolbar").remove();
  document.querySelector("#page > article > section > p:nth-child(1)").remove();
  _GM_addStyle(`
    .page-content{
max-width: none;
padding: 10px 15px;
transform: translateX(0px);
background: #ffffff!important;
}
`);
}
if (pattern.end.is(url)) {
  // console.log("end");
  window.close();
}
if (pattern.info.test(url)) {
  document.querySelector("#intro").click();
}
