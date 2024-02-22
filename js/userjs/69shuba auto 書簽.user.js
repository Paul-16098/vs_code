/** @format */

// ==UserScript==
// @name         69shuba auto 書簽
// @namespace    pl816098
// @version      2.7.6-beta
// @description  自動書籤,更改css,可以在看書頁(https://www.69shuba.com/txt/*/*)找到作者連結
// @author       pl816098
// @match        https://www.69shuba.com/txt/*/*
// @match        https://www.69xinshu.com/txt/*/*
// @match        https://www.69xinshu.com/book/*.htm*
// @match        https://www.69shuba.com/book/*.htm*
// @match        https://www.69shuba.com/txt/*/end.html
// @match        https://www.69xinshu.com/txt/*/end.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=69shuba.com
// @grant        window.close
// @grant        GM_addStyle
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/483067/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// @updateURL https://update.greasyfork.org/scripts/483067/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.meta.js
// ==/UserScript==
const _unsafeWindow =
  typeof unsafeWindow === "undefined" ? window : unsafeWindow; //兼容 ios userscripts 的寫法
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
      /^(https?:\/\/)(www\.(69shuba|69xinshu)\.com)\/txt\/[0-9]*\/(?!end)[0-9]*$/gm,
    is: (url) => {
      if (pattern.book.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  info: {
    pattern:
      /^(https?:\/\/)(www\.(69shuba|69xinshu)\.com)\/book\/[0-9]*\.htm.*$/gm,
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
      /^(https?:\/\/)(www\.(69shuba|69xinshu)\.com)\/txt\/[0-9]*\/end\.html$/gm,
    is: () => {
      // console.debug(document.querySelector("div.page1 > a:nth-child(4)"));
      if (
        pattern.end.pattern.test(
          document.querySelector("div.page1 > a:nth-child(4)")
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
let ele = [];
if (pattern.book.is(url)) {
  // console.log("book");
  ele = [
    "#pageheadermenu",
    "pagefootermenu",
    "body > div.container > div.mybox > div.top_Scroll",
    "body > div.container > div.yuedutuijian.light",
    "#tuijian",
    "#ad",
  ];
  document.querySelector("#a_addbookcase").click();
  let author = "";
  if (_unsafeWindow.bookinfo.author) {
    author = _unsafeWindow.bookinfo.author;
  } else {
    author = document
      .querySelector(
        "body > div.container > div.mybox > div.txtnav > div.txtinfo.hide720 > span:nth-child(2)"
      )
      .textContent.trim()
      .split(" ")[1];
  }
  let spanElement = document.querySelector(
    "body > div.container > div.mybox > div.txtnav > div.txtinfo.hide720 > span:nth-child(2)"
  );
  let aElement = document.createElement("a");
  aElement.href = `https://www.69xinshu.com/modules/article/author.php?author=${author}`;
  aElement.textContent = author;
  aElement.style.color = "#007ead";
  spanElement.textContent = spanElement.textContent.trim().split(" ")[0];
  spanElement.appendChild(aElement);
  _GM_addStyle(`
  /** @format */

  .container .mybox {
    max-width: none;
    min-height: none;
    width: auto;
    height: auto;
  }
  `);
  ele.forEach((ele) => {
    if (document.querySelector(ele)) {
      document.querySelector(ele).remove();
    }
  });
}
if (pattern.info.is(url)) {
  // console.log("info");
  document
    .querySelector(
      "body > div.container > ul > li.col-8 > div:nth-child(2) > ul > li:nth-child(2) > a"
    )
    .click();
  document.querySelector(
    "body > div.container > ul > li.col-8 > div:nth-child(1) > div > div.booknav2 > p:nth-child(2) > a"
  ).style.color = "#007ead";
  document.querySelector(
    "body > div.container > ul > li.col-8 > div:nth-child(1) > div > div.booknav2 > p:nth-child(3) > a"
  ).style.color = "#007ead";
}
if (pattern.end.is()) {
  // console.log("end");
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
        }
      }
    }
  });
}
