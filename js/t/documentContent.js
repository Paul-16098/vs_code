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
  <body>
    <h1>${zc === "z" ? "幫助" : "help"}</h1>
    <div is="settings">
      <a>settings:\n</a>
      <input
        type="checkbox"
        class="settings"
        id="zc"
        onclick=""
      />
    </div>
    <a onclick="window.close()" href="javascrirt:void(0);"
      >${zc === "z" ? "關閉" : "close"}</a
    >
  </body>
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
newTab.document.querySelector("#zc").addEventListener("click", (e) => {
  zc === "z" ? (zc = "c") : (zc = "z");
});
newTab.document.open();
newTab.document.write(documentContent);
newTab.document.close();
