// ==UserScript==
// @name         github的链接在新标签页打开
// @namespace    pl816098
// @version      1.0.3
// @description  让github的链接默认是在新标签页中打开而不是当前页打开
// @author       pl816098
// @match        https://github.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-idle
// @license      MIT
// @supportURL   https://github.com/Paul-16098/vs_code/issues/
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://github.com/Paul-16098/vs_code/raw/main/js/userjs/github%E7%9A%84%E9%93%BE%E6%8E%A5%E5%9C%A8%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%89%93%E5%BC%80.js
// @updateURL    https://github.com/Paul-16098/vs_code/raw/main/js/userjs/github%E7%9A%84%E9%93%BE%E6%8E%A5%E5%9C%A8%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%89%93%E5%BC%80.js
// ==/UserScript==

(function () {
  "use strict";

  let not_blank = ['a[data-testid="raw-button"]'];

  setTimeout(() => {
    let links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      let found = false;
      for (let ii = 0; ii < not_blank.length; ii++) {
        let element = document.querySelector(not_blank[ii]);
        if (element && element.href === links[i].href) {
          found = true;
          break;
        }
      }
      if (!found) {
        let url = links[i].href;
        links[i].href = "javascript:void(0);";
        links[i].onclick = function () {
          window.open(url);
        };
        console.log("github的链接在新标签页打开 run done", links[i]);
      }
    }
  }, 2000);
})();
