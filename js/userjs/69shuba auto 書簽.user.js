// ==UserScript==
// @name         69shuba auto 書簽
// @namespace    pl816098
// @version      2.8.17
// @description  自動書籤,更改css,可以在看書頁(https://www.69shuba.com/txt/*/*)找到作者連結
// @author       pl816098
// @include      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/txt\/[0-9]+\/(?!end)[0-9]+$/
// @include      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/book\/[0-9]+\.htm.*$/
// @include      /^(https?:\/\/)((www\.|)(69shuba|69xinshu|69shu|69shux)\.(com|pro))\/txt\/[0-9]+\/end\.html$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=69shuba.com
// @grant        window.close
// @grant        GM_addStyle
// @grant        GM.addStyle
// @run-at       document-idle
// @license      MIT
// @supportURL   https://github.com/Paul-16098/vs_code/issues/
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// @updateURL    https://github.com/Paul-16098/vs_code/blob/main/js/userjs/69shuba%20auto%20%E6%9B%B8%E7%B0%BD.user.js
// ==/UserScript==
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

zh_tran("t");

console.log("set func remove start");
function remove(str, ...args) {
  try {
    if (typeof str === "string") {
      console.log("str: ", str);
      console.log(
        "document.querySelectorAll(str): ",
        document.querySelectorAll(str)
      );
      if (document.querySelector(str)) {
        document.querySelectorAll(str).forEach((ele) => {
          ele.remove();
        });
      }
    } else if (typeof str === "object" && str.length > 0) {
      str.forEach((str) => {
        console.log("str: ", str);
        console.log(
          "document.querySelectorAll(str): ",
          document.querySelectorAll(str)
        );
        if (document.querySelector(str)) {
          document.querySelectorAll(str).forEach((ele) => {
            ele.remove();
          });
        }
      });
    }
    if (args && args.length > 0) {
      args.forEach((args) => {
        console.log("str: ", str);
        console.log(
          "document.querySelectorAll(str): ",
          document.querySelectorAll(str)
        );
        if (document.querySelector(args)) {
          document.querySelectorAll(args).forEach((ele) => {
            ele.remove();
          });
        }
      });
    }
  } catch (e) {
    console.error(e);
    return [false, str, args];
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
  // console.log("book");
  console.log("_GM_addStyle start");
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
  console.log("_GM_addStyle end");

  console.log("set ele start\n", ele);
  ele = [
    "#pageheadermenu",
    ".mytitle",
    ".top_Scroll",
    ".yuedutuijian.light",
    "#pagefootermenu",
    "body > div.container > div > div.yueduad1",
  ];
  console.log("remove(ele) start");
  let remove_return = remove(ele);
  console.log("remove(ele) end\n", remove_return);
  console.log("set ele end\n", ele);
  document.querySelector("#a_addbookcase").click();
  let author = "";
  if (typeof bookinfo.author === "string") {
    author = bookinfo.author;
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
  aElement.href = `${window.location.origin}/modules/article/author.php?author=${author}`;
  aElement.textContent = author;
  aElement.style.color = "#007ead";
  spanElement.textContent = spanElement.textContent.trim().split(" ")[0];
  spanElement.appendChild(aElement);

  let title = document.querySelector("title").innerText.split("-")[0];
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
  titleElement.href = `${origin}/book/${location.href.split("/")[4]}.htm`;
  titleElement.id = "title";
  yueduad1.replaceWith(titleElement);
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
if (pattern.end.is(url)) {
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
          break;
        }
      }
    }
  });
}
