// ==UserScript==
// @name         69shuba auto 書簽
// @namespace    pl816098
// @version      2.8.19-bate(1.3)
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
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// @license      MIT
// @supportURL   https://github.com/Paul-16098/vs_code/issues/
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// @updateURL    https://github.com/Paul-16098/vs_code/blob/main/js/userjs/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// ==/UserScript==
if (GM_getValue("debug", undefined) === undefined) {
  GM_setValue("debug", false);
}
const debug = GM_getValue("debug", false);

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

console.log("set func remove start");
function remove(...args) {
  try {
    if (args && args.length > 0) {
      args.forEach((args) => {
        if (debug) {
          console.log("str: ", str);
          console.log(
            "document.querySelectorAll(str): ",
            document.querySelectorAll(str)
          );
        }
        if (document.querySelector(args)) {
          document.querySelectorAll(args).forEach((ele) => {
            ele.remove();
          });
        }
      });
    } else {
      throw new Error("fn remove error, args is not a array");
    }
  } catch (e) {
    console.error(e);
    return [false, str, args, e];
  }
  return [true, str, args];
}
console.log("set func remove end\n", remove);

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
  },
  end: {
    pattern:
      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/txt\/[0-9]+\/end\.html$/gm,
    is: (url = window.location.href) => {
      // console.log(document.querySelector("div.page1 > a:nth-child(4)"));
      if (
        pattern.end.pattern.test(
          document.querySelector("div.page1 > a:nth-child(4)")
        ) ||
        pattern.end.pattern.test(url)
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
  if (debug) {
    console.log("book");
  }
  if (debug) {
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
  if (debug) {
    console.log("_GM_addStyle end");
  }

  if (debug) {
    console.log("set ele start\n", ele);
  }
  ele = [
    "#pageheadermenu",
    ".mytitle",
    ".top_Scroll",
    ".yuedutuijian.light",
    "#pagefootermenu",
    "body > div.container > div > div.yueduad1",
  ];
  if (debug) {
    console.log("set ele end\n", ele);
  }
  if (debug) {
    console.log("remove(ele) start");
    let remove_return = remove(ele);
    console.log("remove(ele) end\n", remove_return);
  } else {
    remove(ele);
  }
  document.querySelector("#a_addbookcase").click();
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

  let title;
  if (typeof bookinfo.articlename === "string") {
    title = bookinfo.articlename;
  } else {
    title = document.querySelector("title").innerText.split("-")[0];
  }
  let yueduad1;
  if (pattern.is69shux(window.location.host) === false) {
    yueduad1 = document.querySelector(
      "body > div.container > div > div.yueduad1"
    );
  } else {
    yueduad1 = document.querySelector("#container > div > div.tools");
  }
  let titleElement = document.createElement("a");
  titleElement.appendChild(document.createTextNode(title));
  let articleid;
  if (typeof bookinfo.articleid === "string") {
    articleid = bookinfo.articleid;
  } else {
    articleid = location.href.split("/")[4];
  }
  titleElement.href = `${origin}/book/${articleid}.htm`;
  titleElement.id = "title";
  yueduad1.replaceWith(titleElement);
}
if (pattern.info.is(url)) {
  if (debug) {
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
}
if (pattern.end.is(url)) {
  if (debug) {
    console.log("end");
  }
  document.addEventListener("keydown", function (e) {
    if (!e.repeat) {
      switch (true) {
        case e.key === "ArrowRight": {
          if (debug) {
            console.log('(e.key === "ArrowRight") === true');
          }
          window.close();
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
