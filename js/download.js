/**
 * @format
 * @param {string} [fileName="undefined"]
 * @param {string} url
 */

function download(url, fileName = "undefined") {
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
}
