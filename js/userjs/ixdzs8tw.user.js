// ==UserScript==
// @name         ixdzs8.tw
// @namespace    pl816098
// @version      1.2.2
// @description  自用
// @author       paul
// @match        https://ixdzs8.tw/read/*/*.html
// @match        https://ixdzs8.tw/read/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ixdzs8.tw
// @license      MIT
// @grant        GM_addStyle
// @grant        window.close
// @downloadURL https://update.greasyfork.org/scripts/484505/ixdzs8tw.user.js
// @updateURL https://update.greasyfork.org/scripts/484505/ixdzs8tw.meta.js
// ==/UserScript==

var url = window.location.href;
var pattern = {
  book: /^(https?:\/\/)(ixdzs8\.tw\/read\/[0-9]*\/(?!end)p[0-9]*\.html)$/gm,
  info: /^(https?:\/\/)(ixdzs8\.tw\/read\/[0-9]*\/)$/gm,
  end: /^(https?:\/\/)(ixdzs8\.tw\/read\/[0-9]*\/end\.html)$/gm,
};

if (pattern.book.test(url)) {
  document.querySelector("#page-id3").remove();
  document.querySelector("#page-toolbar").remove();
  document.querySelector("#page > article > section > p:nth-child(1)").remove();
  GM_addStyle(`
    .page-content{
max-width: none;
padding: 10px 15px;
transform: translateX(0px);
background: #ffffff!important;
}
`);
} else if (pattern.end.test(url)) {
  // console.log("end");
  window.close();
} else if (pattern.info.test(url)) {
  document.querySelector("#intro").click();
}
