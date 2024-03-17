// ==UserScript==
// @name         Tools
// @namespace    pl816098
// @description  paul Tools
// @version      2.2.4.1
// @match        *://*/*
// @author       paul
// @license      MIT
// @grant        GM_getValue
// @require      https://scriptcat.org/lib/637/%5E1.3.3/ajaxHooker.js
// @run-at       document-start
// @grant        unsafeWindow
// @supportURL   https://github.com/Paul-16098/vs_code/issues/
// @homepageURL  https://github.com/Paul-16098/vs_code/blob/main/js/userjs/README.md
// @downloadURL  https://github.com/Paul-16098/vs_code/raw/main/js/userjs/Tools.user.js
// @updateURL    https://github.com/Paul-16098/vs_code/raw/main/js/userjs/Tools.user.js
// ==/UserScript==

/* ==UserConfig==
公開接口:
  ajaxHooker:
    title: 公開ajaxHooker接口
    description: 公開ajaxHooker接口
    type: checkbox
    default: false
==/UserConfig== */

const _unsafeWindow =
  typeof unsafeWindow === "undefined" ? window : unsafeWindow; //兼容 ios userscripts 的寫法
const ajaxHooker_on = GM_getValue("公開接口.ajaxHooker", false);
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

/*
https://scriptcat.org/zh-TW/script-show-page/637/
  ajaxHooker.hook
核心方法，通過一個回調函數進行劫持，每次請求發生時自動調用回調函數。可以將所有劫持放在同一回調函數中，也可以多次調用hook方法。示例：

ajaxHooker.hook(request => {
    console.log(request);
});
參數request是一個對象，其包含以下屬性：
type
只讀屬性。一個字符串，表明請求類型是xhr還是fetch。
async
只讀屬性。異步請求為true，同步請求為false，異步特性無法作用於同步請求。
url
method
請求的url和method，可以直接修改。
abort
是否取消請求，設置為true即可取消本次請求。
headers
請求頭，可以直接修改。
data
請求攜帶的數據，可以直接修改。
response
響應內容，必須通過一個回調函數進行讀取和修改。響應內容為一個對象，包含finalUrl、status、responseHeaders和被讀取的響應數據，除響應數據可修改，其他屬性是隻讀的。響應數據是哪個屬性取決於哪個屬性被讀取，xhr可能的屬性為response、responseText、responseXML，fetch可能的屬性為arrayBuffer、blob、formData、json、text。在控制枱輸出時，xhr響應將包含所有屬性，但只有被讀取過的屬性具有明確的值。修改對應屬性即可影響讀取結果，進而實現響應數據的修改。示例：

ajaxHooker.hook(request => {
    if (request.url === 'https://www.example.com/') {
        request.response = res => {
            console.log(res);
            res.responseText += 'test';
        };
    }
});
異步特性
注意：異步特性無法作用於同步請求，但同步修改仍然有效。
你可以將以上所有可修改屬性賦值為Promise，原請求將被阻塞直至Promise完成（若發生reject，數據將不會被修改），此特性可用於異步劫持。以下是一個異步修改響應數據的例子：

ajaxHooker.hook(request => {
    request.response = res => {
        const responseText = res.responseText; // 注意保存原數據
        res.responseText = new Promise(resolve => {
            setTimeout(() => {
                resolve(responseText + 'test');
            }, 3000);
        });
    };
});
也可以傳入async回調函數以實現異步：

ajaxHooker.hook(async request => {
    request.data = await modifyData(request.data);
    request.response = async res => {
        res.responseText = await modifyResponse(res.responseText);
    };
});
ajaxHooker.filter
應於hook方法之前執行，此方法若儘早執行，有助於提升性能。
為hook方法設置過濾規則，只有符合規則的請求才會觸發hook。過濾規則是一個對象數組，參考下例：

ajaxHooker.filter([
    {type: 'xhr', url: 'www.example.com', method: 'GET', async: true},
    {url: /^http/},
]);
type 可選，應是xhr或fetch。
url 可選，字符串或正則表達式，無需完全匹配。
method 可選，不區分大小寫。
async 可選，布爾值。

ajaxHooker.protect
如果庫劫持失敗，可能是其他代碼對xhr/fetch進行了二次劫持，protect方法會嘗試阻止xhr和fetch被改寫。應於document-start階段儘早執行，部分網頁下可能引發錯誤，謹慎使用。示例：

ajaxHooker.protect();

ajaxHooker.unhook
將xhr和fetch恢復至劫持前的狀態，調用此方法後，hook方法不再生效。示例：

ajaxHooker.unhook();
*/
if (ajaxHooker_on === true) {
  _unsafeWindow.ajaxHooker = ajaxHooker;
} else {
  ajaxHooker.unhook();
}

function set_gm() {
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
}
