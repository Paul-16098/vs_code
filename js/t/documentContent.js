/**
 * a JSDoc
 *
 * @format
 * @date 2023/11/27 - 下午9:28:20
 * @author pl816098
 * @type {string}
 */
let zc = "z";
let documentContent = `
<!DOCTYPE html>
<html>
<h1>${zc === "z" ? "幫助" : "help"}</h1>
<a>tast\n</a>
<a onclick="window.close()" href="javascrirt:void(0);">${
  zc === "z" ? "關閉" : "close"
}</a>

</html>
`;
// 在新分頁中開啟文檔
/**
 * a JSDoc
 * @date 2023/11/27 -下午9:28:20
 * @author pl816098
 *
 * @type {*}
 */
let newTab = window.open();
newTab.document.open();
newTab.document.write(documentContent);
newTab.document.close();
