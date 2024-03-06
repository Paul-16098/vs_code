// ==UserScript==
// @name         Tools
// @namespace    pl816098
// @description  paul Tools
// @version      2.1.0
// @match        *://*/*
// @author       paul
// @license      MIT
// @require      https://scriptcat.org/lib/637/%5E1.3.3/ajaxHooker.js
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

const _unsafeWindow =
  typeof unsafeWindow === "undefined" ? window : unsafeWindow; //兼容 ios userscripts 的寫法
_unsafeWindow.debug = (str, title = "INFO", type = "log") => {
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
_unsafeWindow.set_gm = () => {
  set_gm: {
    var _GM_xmlhttpRequest,
      _GM_registerMenuCommand,
      _GM_notification,
      _GM_addStyle,
      _GM_openInTab,
      _GM_info,
      _GM_setClipboard;
    GM_xmlhttpRequest: {
      if (typeof GM_xmlhttpRequest !== "undefined") {
        _GM_xmlhttpRequest = GM_xmlhttpRequest;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.xmlHttpRequest !== "undefined"
      ) {
        _GM_xmlhttpRequest = GM.xmlHttpRequest;
      } else {
        _GM_xmlhttpRequest = (f) => {
          fetch(f.url, {
            method: f.method || "GET",
            body: f.data,
            headers: f.headers,
          })
            .then((response) => response.text())
            .then((data) => {
              f.onload && f.onload({ response: data });
            })
            .catch(f.onerror && f.onerror());
        };
      }
    }
    GM_registerMenuCommand: {
      if (typeof GM_registerMenuCommand !== "undefined") {
        _GM_registerMenuCommand = GM_registerMenuCommand;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.registerMenuCommand !== "undefined"
      ) {
        _GM_registerMenuCommand = GM.registerMenuCommand;
      } else {
        _GM_registerMenuCommand = (s, f) => {
          debug(s);
          debug(f);
        };
      }
    }
    GM_info: {
      if (typeof GM_info !== "undefined") {
        _GM_info = GM_info;
      } else if (typeof GM !== "undefined" && typeof GM.info !== "undefined") {
        _GM_info = GM.info;
      } else {
        _GM_info = { script: {} };
      }
    }
    GM_notification: {
      if (typeof GM_notification !== "undefined") {
        _GM_notification = GM_notification;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.notification !== "undefined"
      ) {
        _GM_notification = GM.notification;
      } else {
        _GM_notification = (s) => {
          showTips(String(s.text || s));
        };
      }
    }
    GM_openInTab: {
      if (typeof GM_openInTab !== "undefined") {
        _GM_openInTab = GM_openInTab;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.openInTab !== "undefined"
      ) {
        _GM_openInTab = GM.openInTab;
      } else {
        _GM_openInTab = (s, t) => {
          window.open(s);
          debug(t);
        };
      }
    }
    GM_addStyle: {
      if (typeof GM_addStyle !== "undefined") {
        _GM_addStyle = GM_addStyle;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.addStyle !== "undefined"
      ) {
        _GM_addStyle = GM.addStyle;
      } else {
        _GM_addStyle = (cssStr = null) => {
          let styleEle = document.createElement("style");
          styleEle.classList.add("_GM_addStyle");
          styleEle.innerHTML = cssStr;
          document.head.appendChild(styleEle);
          return styleEle;
        };
      }
    }
    GM_setClipboard: {
      if (typeof GM_setClipboard !== "undefined") {
        _GM_setClipboard = GM_setClipboard;
      } else if (
        typeof GM !== "undefined" &&
        typeof GM.setClipboard !== "undefined"
      ) {
        _GM_setClipboard = GM.setClipboard;
      } else {
        _GM_setClipboard = (s, i) => {
          debug(s);
          debug(i);
        };
      }
    }
  }
};

/**
 * https://scriptcat.org/zh-TW/script-show-page/637/
 * ajaxHooker.hook
核心方法，通过一个回调函数进行劫持，每次请求发生时自动调用回调函数。可以将所有劫持放在同一回调函数中，也可以多次调用hook方法。示例：

ajaxHooker.hook(request => {
    console.log(request);
});
参数request是一个对象，其包含以下属性：
type
只读属性。一个字符串，表明请求类型是xhr还是fetch。
async
只读属性。异步请求为true，同步请求为false，异步特性无法作用于同步请求。
url
method
请求的url和method，可以直接修改。
abort
是否取消请求，设置为true即可取消本次请求。
headers
请求头，可以直接修改。
data
请求携带的数据，可以直接修改。
response
响应内容，必须通过一个回调函数进行读取和修改。响应内容为一个对象，包含finalUrl、status、responseHeaders和被读取的响应数据，除响应数据可修改，其他属性是只读的。响应数据是哪个属性取决于哪个属性被读取，xhr可能的属性为response、responseText、responseXML，fetch可能的属性为arrayBuffer、blob、formData、json、text。在控制台输出时，xhr响应将包含所有属性，但只有被读取过的属性具有明确的值。修改对应属性即可影响读取结果，进而实现响应数据的修改。示例：

ajaxHooker.hook(request => {
    if (request.url === 'https://www.example.com/') {
        request.response = res => {
            console.log(res);
            res.responseText += 'test';
        };
    }
});
异步特性
注意：异步特性无法作用于同步请求，但同步修改仍然有效。
你可以将以上所有可修改属性赋值为Promise，原请求将被阻塞直至Promise完成（若发生reject，数据将不会被修改），此特性可用于异步劫持。以下是一个异步修改响应数据的例子：

ajaxHooker.hook(request => {
    request.response = res => {
        const responseText = res.responseText; // 注意保存原数据
        res.responseText = new Promise(resolve => {
            setTimeout(() => {
                resolve(responseText + 'test');
            }, 3000);
        });
    };
});
也可以传入async回调函数以实现异步：

ajaxHooker.hook(async request => {
    request.data = await modifyData(request.data);
    request.response = async res => {
        res.responseText = await modifyResponse(res.responseText);
    };
});
ajaxHooker.filter
应于hook方法之前执行，此方法若尽早执行，有助于提升性能。
为hook方法设置过滤规则，只有符合规则的请求才会触发hook。过滤规则是一个对象数组，参考下例：

ajaxHooker.filter([
    {type: 'xhr', url: 'www.example.com', method: 'GET', async: true},
    {url: /^http/},
]);
type 可选，应是xhr或fetch。
url 可选，字符串或正则表达式，无需完全匹配。
method 可选，不区分大小写。
async 可选，布尔值。

ajaxHooker.protect
如果库劫持失败，可能是其他代码对xhr/fetch进行了二次劫持，protect方法会尝试阻止xhr和fetch被改写。应于document-start阶段尽早执行，部分网页下可能引发错误，谨慎使用。示例：

ajaxHooker.protect();
ajaxHooker.unhook
将xhr和fetch恢复至劫持前的状态，调用此方法后，hook方法不再生效。示例：

ajaxHooker.unhook();
 * */
_unsafeWindow.ajaxHooker = ajaxHooker;
