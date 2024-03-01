function remove(str, ...args) {
  try {
    if (typeof str === "string") {
      console.log("str: ", str);
      console.log(
        "document.querySelectorAll(str): ",
        document.querySelectorAll(str)
      );
      if (document.querySelector(str)) {
        document.querySelectorAll(str).forEach((ele) => {
          ele.remove();
        });
      }
    } else if (typeof str === "object" && str.length > 0) {
      str.forEach((str) => {
        console.log("str: ", str);
        console.log(
          "document.querySelectorAll(str): ",
          document.querySelectorAll(str)
        );
        if (document.querySelector(str)) {
          document.querySelectorAll(str).forEach((ele) => {
            ele.remove();
          });
        }
      });
    }
    if (args && args.length > 0) {
      args.forEach((args) => {
        console.log("str: ", str);
        console.log(
          "document.querySelectorAll(str): ",
          document.querySelectorAll(str)
        );
        if (document.querySelector(args)) {
          document.querySelectorAll(args).forEach((ele) => {
            ele.remove();
          });
        }
      });
    }
  } catch (e) {
    console.error(e);
    return [false, str, args];
  }
  return [true, str, args];
}
