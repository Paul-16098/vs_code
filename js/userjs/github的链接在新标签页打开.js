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
