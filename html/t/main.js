/**
 * a JSDoc
 * @date 2023/12/20 - 上午11:25:47
 * @author pl816098
 *
 * @type {*}
 */
var _unsafeWindow = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
_unsafeWindow.debug = function (str, title = "INFO", type = "log") {
  if (
    !(type === "log" || type === "info" || type === "error" || type === "warn")
  ) {
    console.warn("錯誤: type != log || info || warn || error but = " + type);
  }
  console[type](
    `%c ${title}:\n`,
    "color: white;font-size: large;font-weight: bold;background-color: black;",
    str
  );
};
