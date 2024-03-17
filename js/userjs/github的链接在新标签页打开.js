// ==UserScript==
// @name         github的链接在新标签页打开
// @namespace    pl816098
// @version      1.1.1.0
// @description  让github的链接默认是在新标签页中打开而不是当前页打开
// @author       pl816098
// @match        https://github.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_getValue
// @run-at       document-idle
// @license      MIT
// @supportURL   https://github.com/Paul-16098/vs_code/issues/
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://github.com/Paul-16098/vs_code/raw/main/js/userjs/github%E7%9A%84%E9%93%BE%E6%8E%A5%E5%9C%A8%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%89%93%E5%BC%80.js
// @updateURL    https://github.com/Paul-16098/vs_code/raw/main/js/userjs/github%E7%9A%84%E9%93%BE%E6%8E%A5%E5%9C%A8%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%89%93%E5%BC%80.js
// ==/UserScript==
/* ==UserConfig==
config:
  host:
    title: 是否取消對外部域名的處理
    description: 是否取消對外部域名的處理
    type: checkbox
    default: true
 ==/UserConfig== */

const host = GM_getValue("config.host", true);
const not_blank = [
  'a[data-testid="raw-button"]' /*
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li:nth-child(1) > a",
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li:nth-child(2) > a",
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li:nth-child(3) > a",
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li:nth-child(4) > a",
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li:nth-child(5) > a",
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li:nth-child(6) > a",*/,
];
const not_blank_all = [
  "#repo-content-pjax-container > div > div > div > div.Layout-main > react-partial > div > div > div > div > div > div> nav > ul > li > a",
];

setTimeout(() => {
  run();
}, 2000);

function run(_i = 0) {
  // console.log("github的链接在新标签页打开: run start");
  let links = document.getElementsByTagName("a");
  for (let i = _i; i < links.length; i++) {
    // console.log(
    // "github的链接在新标签页打开: for(1), i: ",
    // i,
    // ", links[i]: ",
    // links[i]
    // );
    let found = false;
    for (let ii = 0; ii < not_blank.length && not_blank.length > 0; ii++) {
      // console.log(
      // "github的链接在新标签页打开: for(2), ii: ",
      // ii,
      // ", not_blank[ii]: ",
      // not_blank[ii]
      // );
      let element = document.querySelector(not_blank[ii]);
      if (element && element.href === links[i].href) {
        found = true;
        // console.log("github的链接在新标签页打开: not_blank found", found);
        break;
      }
    }
    for (
      let ii = 0;
      ii < not_blank_all.length && not_blank_all.length > 0;
      ii++
    ) {
      // console.log(
      // "github的链接在新标签页打开: for(2), ii: ",
      // ii,
      // ", not_blank[ii]: ",
      // not_blank[ii]
      // );
      let element = document.querySelectorAll(not_blank_all[ii]);
      for (let iii = 0; iii < element.length && element.length > 0; iii++) {
        const element2 = element[iii];
        if (element2 && element2.href === links[i].href) {
          found = true;
          // console.log("github的链接在新标签页打开: not_blank_all found", found);
          break;
        }
      }
    }
    if (!found) {
      let url = links[i].href;
      let o_url = new URL(url);
      let patt = /(?:([^:/\\@\s])+\.)*github\.([a-zA-Z]{2,4})$/i;
      if (!patt.test(o_url.hostname)) {
        // console.log("!patt.test(o_url.hostname)", o_url.hostname);
        if (host) {
          // console.log("!patt.test(o_url.hostname) so break");
          i++;
          return run(i);
        }
      } else if (o_url.protocol === "javascript:") {
        i++;
        return run(i);
      } else if (url === "#") {
        i++;
        return run(i);
      }
      links[i].href = "javascript:void(0);";
      links[i].onclick = function () {
        window.open(url);
      };
      // console.log("github的链接在新标签页打开 run done", links[i]);
    }
  }
}
