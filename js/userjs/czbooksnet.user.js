/** @format */

// ==UserScript==
// @name         czbooks.net
// @namespace    pl816098
// @version      1.0.9
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
/** @format */

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
document.querySelector("body > div.header").remove();
document.querySelector("body > div.footer").remove();
document.querySelector("body > div.main > div:nth-child(3)").remove();
document.querySelector("#go-to-top").remove();
document
  .querySelector("#sticky-parent > div.chapter-detail > div.notice")
  .remove();
document.querySelector("div.download-notice").remove();
