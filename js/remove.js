/** @format */

function remove(str, ...args) {
  if (typeof str === "string") {
    if (document.querySelector(str)) {
      document.querySelector(str).remove();
    }
  } else if (typeof str === "object" && str.length > 0) {
    str.forEach((str) => {
      if (document.querySelector(str)) {
        document.querySelector(str).remove();
      }
    });
  }
  if (args && args.length > 0) {
    args.forEach((args) => {
      if (document.querySelector(args)) {
        document.querySelector(args).remove();
      }
    });
  }
}
