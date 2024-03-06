/* global ajaxHooker $*/
(function () {
  "use strict";
  let item = "", keyStatus = {
      shift: false,
      ctrl: false
  }, dataList = {};
  const conf = {
"isOpen": true,
"ver": false
};
  if (!conf.ver) {
      conf.ver = "0.1.2";
      let t = Date.now(),
          times = 0;
      while ((Date.now() - t) / 1000 < 5) {
          times++;
          if (times > 5) {
              conf.ver = false;
          }
          t = Date.now();
      }
  }


  // this.settings.keyMap
  window.addEventListener('keydown', a => {
      keyStatus.shift = a.shiftKey;
      keyStatus.ctrl = a.ctrlKey;
  });
  window.addEventListener('keyup', a => {
      keyStatus.shift = a.shiftKey;
      keyStatus.ctrl = a.ctrlKey;
  });
  const k = Object.prototype.hasOwnProperty;
  function deepProxy(obj) {
      if (typeof obj === "object" && obj !== null) {
          for (let key in obj) obj[key] = deepProxy(obj[key]);
          return new Proxy(obj, {
              get(target, key, receiver) {
                  if (['amount', item].includes(key)) {
                      let val = 0;
                      if (item === key) {
                          item = "";
                          if (target[key].time) target[key].time /= 2;
                          else if (target[key].progress) target[key].progress = 99;
                          else if (target[key].count) target[key].count += 1e3;
                          else if (target[key].amount) {
                              if (target[key].max < 0) {
                                  target[key].amount += 1e4;
                                  if (keyStatus.ctrl) target[key].amount += 9e4;
                                  else if (keyStatus.shift) target[key].amount += 49e4;
                              } else {
                                  target[key].amount = target[key].max;
                              }
                          }
                          val = Reflect.get(target, key, receiver);
                      } else if (target.max > 0) {
                          val = target.max;
                      } else {
                          val = target.amount;
                          if (item === target.name) {
                              item = "";
                              val += 1e4;
                          }
                      }
                      return val;
                  }
                  return Reflect.get(target, key, receiver);
              },
              set(target, key, value, receiver) {
                  return Reflect.set(target, key, value, receiver);
              },
          });
      } else {
          return obj;
      }
  }
  Object.prototype.hasOwnProperty = function (...a) {
      if (this && this.seed && this.resource) {
          Object.prototype.hasOwnProperty = k; //恢复拦截
          dataList = this;
          return k.apply(deepProxy(this), a);
      }
      return k.apply(this, a);
  };
  (() => {
      const doneList = [0, 0, 0, 0];
      const i = setInterval(() => {
          if (typeof $ === "undefined") return;
          if (!doneList[0] && $(".promoBar>span.left>h1>span")?.text()) {
              doneList[0] = 1;
              $(".promoBar>span.left>h1>span")
                  .html(
                      `<a href="https://scriptcat.org/script-show-page/1408">【<span style="display:inline-flex;flex-direction:column;font-size:50%;line-height:0.6rem;vertical-align:top;align-items:center;"><span>EVOLVE</span><span>涛之雨助手</span></span>】</a>已暂停[@<span id="currentUserName">${$("#currentUserName").text()}</span>]数据同步</span>`
                  )
                  .removeClass("has-text-success")
                  .addClass("has-text-info")
                  .css("margin-left", "-8px");
              $(".external-links li a").map((_, a) => {
                  ["Reddit", "Discord", "GitHub", "Patreon", "Donate"].includes(
                      a.innerText
                  ) && ((a.title = a.innerText), (a.innerText = a.innerText[0]));
              });
          }
          if (!doneList[1] && $("#login-tip")?.text()?.includes("已登录")) {
              doneList[1] = 1;
              setInterval(() => {
                  $("#login-tip button").map(
                      (_, a) => a.innerText.includes("立即备份") && a.click()
                  );
              }, 6e5);
          }
          if (!doneList[2] && $("#resources div").length) {
              // doneList[2] = 1;
              $("#resources div").map((_, a) => {
                  a.ondblclick = function (a) {
                      item = this.id.slice(3);
                  };
              });
          }
          if (!doneList[3] && $("progress").length) {
              // doneList[3] = 1;
              $('progress').map((_, a) => {
                  a.ondblclick = function () {
                      if (this.parentElement.id) item = this.parentElement.id.replace(/[A-Z]/g, a => "++" + a.toLowerCase()).split('++')[1];
                      else item = this.parentElement.parentElement.id;
                  };
              });
          }
          // if (undefined===doneList.find((a) => !a)) clearInterval(i);
      }, 500);
  })();
  ajaxHooker.hook(
      (request) => request.url.endsWith("/cloud/sync") && (request.abort = true)
  );
})();
