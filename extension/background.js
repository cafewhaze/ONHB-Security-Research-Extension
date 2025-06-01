chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(() => {});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getCookie") {
    const urls = [
      "https://prova.olimpiadadehistoria.com.br",
      "https://prova.olimpiadadehistoria.com.br/prova/",
      "https://prova.olimpiadadehistoria.com.br/api_core/",
    ];
    let cookieFound = false;

    urls.forEach((url, index) => {
      chrome.cookies.get({ url, name: message.name }, (cookie) => {
        if (cookie && !cookieFound) {
          cookieFound = true;
          sendResponse({ cookie: cookie.value });
        }
        if (index === urls.length - 1 && !cookieFound) {
          sendResponse({ cookie: null });
        }
      });
    });
    return true;
  }

  if (message.type === "sendToBackend") {
    const maxRetries = 3;
    let attempt = 0;

    function trySend() {
      fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message.data),
      })
        .then((response) => response.json())
        .then((data) => {
          sendResponse({ status: "success", data });
        })
        .catch((error) => {
          if (attempt < maxRetries - 1) {
            attempt++;
            setTimeout(trySend, 1000);
          } else {
            sendResponse({ status: "error", error: error.message });
          }
        });
    }

    trySend();
    return true;
  }

  if (message.type === "loginSuccess") {
    chrome.storage.local.set({ lastLogin: message.data }, () => {
      sendResponse({ status: "success" });
    });
    return true;
  }
});

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (details.url.includes("prova.olimpiadadehistoria.com.br/prova/")) {
      chrome.tabs.sendMessage(details.tabId, { type: "checkLogin" });
    }
  },
  { url: [{ hostSuffix: "prova.olimpiadadehistoria.com.br" }] }
);

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.url.includes("sui_login.json")) {
      const setCookieHeader = details.responseHeaders.find(
        (header) => header.name.toLowerCase() === "set-cookie"
      );
    }
  },
  {
    urls: [
      "https://prova.olimpiadadehistoria.com.br/api_core/core/sui_login.json",
    ],
  },
  ["responseHeaders"]
);
