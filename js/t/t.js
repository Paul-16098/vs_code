/** @format */

// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
// 取得文件的根節點
/**
 * a JSDoc
 * @date 2023/11/27 - 下午9:28:20
 * @author pl816098
 *
 * @type {*}
 */
let rootNode = document.documentElement;
/**
 * a JSDoc
 * @date 2023/11/27 - 下午9:28:20
 * @author pl816098
 *
 * @type {*}
 */
let map = new Map([
  // ['value', 'key'],
  // key => value
  ["", ""],
]);

map.forEach((key, value) => {
  let key_output = new RegExp(key, "g");
  // 開始遍歷並替換文字
  debug(
    `value_output = ${key_output};\nkey = ${key};\nvalue = ${value};`,
    "DEBUGER",
    "debug"
  );
  replaceAllTextNodes(rootNode, key_output, value);
});

// 遍歷所有文字節點
/**
 * a JSDoc
 * @date 2023/11/27 - 下午9:28:20
 * @author pl816098
 *
 * @param {*} node
 * @param {*} pattern
 * @param {*} replacement
 */
function replaceAllTextNodes(node, pattern, replacement) {
  if (node.nodeType === Node.TEXT_NODE) {
    // 替換文字
    node.textContent = node.textContent.replace(pattern, replacement);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // 遞迴處理子節點
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceAllTextNodes(node.childNodes[i], pattern, replacement);
    }
  }
}
