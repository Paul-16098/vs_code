// ==UserScript==
// @name         69shuba auto 書簽
// @namespace    pl816098
// @version      3.1.12.3
// @description  自動書籤,更改css,可以在看書頁(https://www.69shuba.com/txt/*/*)找到作者連結
// @author       pl816098
// @match        https://www.69shuba.com/txt/*/*
// @match        https://www.69shuba.com/txt/*/end.html
// @match        https://www.69shuba.com/book/*.htm*
// @match        https://www.69xinshu.com/txt/*/*
// @match        https://www.69xinshu.com/txt/*/end.html
// @match        https://www.69xinshu.com/book/*.htm*
// @match        https://www.69shu.pro/txt/*/*
// @match        https://www.69shu.pro/txt/*/end.html
// @match        https://www.69shu.pro/book/*.htm*
// @match        https://69shux.com/txt/*/*
// @match        https://69shux.com/txt/*/end.html
// @match        https://69shux.com/book/*.htm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=69shuba.com
// @grant        window.close
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        unsafeWindow
// @run-at       document-idle
// @license      MIT
// @supportURL   https://github.com/Paul-16098/vs_code/issues/
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://github.com/Paul-16098/vs_code/raw/main/js/userjs/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// @updateURL    https://github.com/Paul-16098/vs_code/raw/main/js/userjs/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// ==/UserScript==

/* ==UserConfig==
config:
  is_close:
    title: 再結束頁時是否自動關閉
    description: 再結束頁(https://www.69shu.pro/txt/*\/end.html)時是否自動關閉
    type: checkbox
    default: true
  is_hook_alert:
    title: 是否劫持alert
    description: 是否劫持alert
    type: checkbox
    default: true
  auto_bookcase:
    title: 自動書籤
    description: 自動書籤
    type: checkbox
    default: true
---
debug:
  debug_log:
    title: debug log?
    description: debug log?
    type: checkbox
    default: false
 ==/UserConfig== */

// https://github.com/scriptscat/scriptcat/issues/264
// 希望支持// @grant        window.close

const debug_log = GM_getValue("debug.debug_log", false);
// const is_close = GM_getValue("config.is_close", true);
const auto_bookcase = GM_getValue("config.auto_bookcase", true);

const _unsafeWindow =
  typeof unsafeWindow === "undefined" ? window : unsafeWindow; //兼容 ios userscripts 的寫法

let _GM_addStyle;
if (typeof GM_addStyle !== "undefined") {
  _GM_addStyle = GM_addStyle;
} else if (typeof GM !== "undefined" && typeof GM.addStyle !== "undefined") {
  _GM_addStyle = GM.addStyle;
} else {
  _GM_addStyle = (cssStr) => {
    let styleEle = document.createElement("style");
    styleEle.classList.add("_GM_addStyle");
    styleEle.innerHTML = cssStr;
    document.head.appendChild(styleEle);
    return styleEle;
  };
}

if (typeof zh_tran === "function") {
  zh_tran("t"); // 網站原有的函數
}

if (debug_log) {
  console.log("set func remove start");
}
function remove(...args) {
  try {
    if (args && args.length > 0) {
      args.forEach((args) => {
        if (debug_log) {
          console.log("args: ", args);
          console.log(
            "document.querySelectorAll(args): ",
            document.querySelectorAll(args)
          );
        }
        if (document.querySelector(args)) {
          document.querySelectorAll(args).forEach((ele) => {
            ele.remove();
          });
        }
      });
    } else {
      throw new Error(
        "fn remove error, args is not a array or args.length =< 0"
      );
    }
  } catch (e) {
    console.error(e);
    return [false, args, e];
  }
  return [true, args];
}
if (debug_log) {
  console.log("set func remove end\n", remove);
}

let url = window.location.href;
let pattern = {
  is69shux: (host = window.location.host) => {
    if (host === "69shux.com") {
      return true;
    } else {
      return false;
    }
  },
  book: {
    pattern:
      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/txt\/[0-9]+\/(?!end)[0-9]+$/gm,
    is: (url = window.location.href) => {
      if (pattern.book.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  info: {
    pattern:
      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/book\/[0-9]+\.htm.*$/gm,
    is: (url = window.location.href) => {
      if (pattern.info.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  } /*,
  end: {
    pattern:
      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/txt\/[0-9]+\/end\.html$/gm,
    is: (url = window.location.href) => {
      if (pattern.end.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  next_is_end: {
    is: (url) => {
      if (document.querySelector("div.page1 > a:nth-child(4)") !== undefined) {
        if (
          document.querySelector("div.page1 > a:nth-child(4)").href !==
          undefined
        ) {
          url = document.querySelector("div.page1 > a:nth-child(4)").href;
        }
      } else {
        return undefined;
      }
      if (pattern.end.pattern.test(url)) {
        return true;
      } else {
        return false;
      }
    },
  },*/,
};
let ele = [];
if (pattern.book.is(url)) {
  if (GM_getValue("config.is_hook_alert", true)) {
    _unsafeWindow.alert = (...args) => {
      console.log("not alert", args);
    };
  }
  if (debug_log) {
    console.log("book");
  }
  if (debug_log) {
    console.log("_GM_addStyle start");
  }
  _GM_addStyle(`
  /** @format */

.container,
.mybox {
  max-width: none !important;
  min-width: 0px !important;
  max-height: none !important;
  min-height: 0px !important;
  width: auto !important;
  height: auto !important;
  margin: auto !important;
}

#title {
  font-size: large;
  font-weight: bold;
  color: #000;
}

      `);
  if (debug_log) {
    console.log("_GM_addStyle end");
  }

  if (debug_log) {
    console.log("set ele start\n", ele);
  }
  ele = [
    "#pageheadermenu",
    ".mytitle",
    ".top_Scroll",
    ".yuedutuijian.light",
    "#pagefootermenu",
    "body > div.container > div > div.yueduad1",
    "#goTopBtn",
  ];
  if (debug_log) {
    console.log("set ele end\n", ele);
  }
  if (debug_log) {
    console.log("remove(ele) start");
    let remove_return = remove(ele);
    console.log("remove(ele) end\n", remove_return);
  } else {
    remove(ele);
  }
  if (auto_bookcase) {
    document.querySelector("#a_addbookcase").click();
  } else {
    console.log("auto_bookcase !== true");
  }
  let author = "";
  if (typeof bookinfo.author === "string") {
    author = bookinfo.author; // 網站原有的變量
  } else {
    // 如果變量不存在
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
  aElement.href = `${window.location.origin}/modules/article/author.php?author=${author}`;
  aElement.textContent = author;
  aElement.style.color = "#007ead";
  spanElement.textContent = spanElement.textContent.trim().split(" ")[0];
  spanElement.appendChild(aElement);

  let r = 0;
  {
    get_title: try {
      r++;
      console.log("get_title,", r);
      let title;
      if (typeof bookinfo.articlename === "string") {
        title = bookinfo.articlename;
      } else {
        title = document.querySelector("title").innerText.split("-")[0];
      }
      let old_titleElement;
      if (pattern.is69shux(window.location.host) === false) {
        old_titleElement = document.querySelector(
          "body > div.container > div > div.yueduad1"
        );
      } else {
        old_titleElement = document.querySelector(
          "div.container > div.mybox > div.tools"
        );
      }
      if (
        old_titleElement === null ||
        old_titleElement === undefined ||
        typeof old_titleElement === "undefined"
      ) {
        console.warn(
          "break get_title;",
          `(
          yueduad1 === null ||
          yueduad1 === undefined ||
          typeof yueduad1 === "undefined"
        )`,
          old_titleElement === null ||
            old_titleElement === undefined ||
            typeof old_titleElement === "undefined"
        );
        break get_title;
      }
      let new_titleElement = document.createElement("a");
      new_titleElement.appendChild(document.createTextNode(title));
      let articleid;
      if (typeof bookinfo.articleid === "string") {
        articleid = bookinfo.articleid;
      } else {
        articleid = location.href.split("/")[4];
      }
      new_titleElement.href = `${origin}/book/${articleid}.htm`;
      new_titleElement.id = "title";
      old_titleElement.replaceWith(new_titleElement);
    } catch (error) {
      console.warn("break get_title;", error);
      break get_title;
    }
  }
}
if (pattern.info.is(url)) {
  if (debug_log) {
    console.log("info");
  }
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
  /*
  let c = function () {
    try {
      let iframe;
      let read = document.querySelector(
        "body > div.container > ul > li.col-8 > div:nth-child(1) > div > div.addbtn > a:nth-child(1)"
      );
      if (!pattern.book.is(read.href)) {
        iframe = document.getElementById("iframe_book");
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.id = "iframe_book";
          iframe.src = `https://www.69shu.pro/book/${bookinfo.articleid}`;
          iframe.style.width = 0;
          iframe.style.height = 0;
          document.body.appendChild(iframe);
        }
      }

      document.querySelector(
        "body > div.container > ul > li.col-8 > div:nth-child(1) > div > div.addbtn > a.btn.link-instanted"
      ).href = iframe.contentWindow.document.querySelector(
        'li[data-num="1"] > a'
      ).href;
      iframe.remove();
    } catch (e) {
      console.error(e);
      return;
    }
    return true;
  };
  let r;
  _unsafeWindow.onload = function () {
    r = c();
  };
  let rr;
  if (r !== true) {
    r = setInterval(() => {
      rr = c();
      if (rr === true) {
        clearInterval(r);
      }
    }, 5000);
  }*/
} /*
if (pattern.end.is(url)) {
  if (debug) {
    console.log("end");
  }
  if (is_close) {
    window.close();
  }
}
if (pattern.next_is_end.is()) {
  if (debug) {
    console.log("next_is_end");
  }
  document.addEventListener("keydown", function (e) {
    if (!e.repeat) {
      switch (true) {
        case e.key === "ArrowRight": {
          if (debug) {
            console.log('(e.key === "ArrowRight") === true');
          }
          if (is_close) {
            window.close();
          }
          break;
        }
        default: {
          if (debug) {
            console.log("e: ", e);
          }
          break;
        }
      }
    }
  });
}
*/
