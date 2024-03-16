// ==UserScript==
// @name         github的链接在新标签页打开
// @namespace    pl816098
// @version      1.0.5
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

(function () {
  "use strict";

  const host = GM_getValue("config.host", true);
  const not_blank = ['a[data-testid="raw-button"]'];
  const not_run_url = ["javascript:void(0);"];

  setTimeout(() => {
    console.log("github的链接在新标签页打开: setimeout start");
    let links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      console.log(
        "github的链接在新标签页打开: for(1), i: ",
        i,
        ", links[i]: ",
        links[i]
      );
      let found = false;
      let shouldSkipLink = false;
      loop1: for (const ele of not_blank) {
        console.log(`github的链接在新标签页打开: for(2), ele: `, ele);
        let element = document.querySelector(ele);
        if (element && element.href === links[i].href) {
          found = true;
          console.log("github的链接在新标签页打开: not_blank found", found);
          shouldSkipLink = true;
          break loop1;
        }
      }
      if (!found) {
        let url = links[i].href;
        loop2: for (const ele of not_run_url) {
          if (url === ele) {
            shouldSkipLink = true;
            break loop2;
          }
        }
        if (shouldSkipLink === true) {
          break;
        }
        let o_url = new URL(url);
        if (o_url.hostname !== "github.com") {
          console.log('o_url.hostname !== "github.com"', o_url.hostname);
          if (host) {
            console.log(
              'o_url.hostname !== "github.com" so break',
              o_url.hostname
            );
            break;
          }
        }
        links[i].href = "javascript:void(0);";
        links[i].onclick = function () {
          window.open(url);
        };
        console.log("github的链接在新标签页打开 run done", links[i]);
      }
    }
  }, 2000);
})();
