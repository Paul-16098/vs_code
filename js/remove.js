/** @format */

function remove(str, ...args) {
  if (typeof str === "string") {
    if (document.querySelector(str)) {
      document.querySelectorAll(str).forEach((ele) => {
        ele.remove();
      });
    } else if (typeof str === "object" && str.length > 0) {
      str.forEach((str) => {
        if (document.querySelector(str)) {
          document.querySelectorAll(str).forEach((ele) => {
            ele.remove();
          });
        }
      });
    }
    if (args && args.length > 0) {
      args.forEach((args) => {
        if (document.querySelector(args)) {
          document.querySelectorAll(args).forEach((ele) => {
            ele.remove();
          });
        }
      });
    }
  }
}
