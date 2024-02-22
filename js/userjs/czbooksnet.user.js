/** @format */

// ==UserScript==
// @name         czbooks.net
// @namespace    pl816098
// @version      1.1.0
// @description  自用
// @author       pl816098
// @match        https://czbooks.net/n/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=czbooks.net
// @grant        GM_addStyle
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/487217/czbooksnet.user.js
// @updateURL https://update.greasyfork.org/scripts/487217/czbooksnet.meta.js
// ==/UserScript==

GM_addStyle(`
#sticky-parent {
  width: auto;
}
#sticky-parent > .chapter-detail {
  width: auto;
}
.content {
  width: 77.6458307902em;
  margin-left: -4em;
}
`);
let ele = [
  "body > div.header",
  "body > div.footer",
  "body > div.main > div:nth-child(3)",
  "#go-to-top",
  "#sticky-parent > div.chapter-detail > div.notice",
];
ele.forEach((ele) => {
  if (document.querySelector(ele)) {
    document.querySelector(ele).remove();
  }
});
