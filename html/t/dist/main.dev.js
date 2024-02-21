"use strict";

var _unsafeWindow = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;

_unsafeWindow.debug = function (str, title, type) {
  var typeput = type ? type : 'log';
  console[typeput]("%c ".concat(title ? title : 'INFO', ":\n"), 'color: white;font-size: large;font-weight: bold;background-color: black;', str);
};