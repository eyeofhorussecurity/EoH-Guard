
// Move this to top to avoid undefined errors
const phishingTabInfo = {};
const popupAdCount = {};


// ======================= Ad / Popup Detection =======================
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const tabId = details.tabId;
    if (!popupAdCount[tabId]) popupAdCount[tabId] = 0;

    if (
      details.url.includes("doubleclick.net") ||
      details.url.includes("adservice.google.com") ||
      details.url.includes("ads")
    ) {
      popupAdCount[tabId]++;

      if (popupAdCount[tabId] > 5) {
        if (phishingTabInfo[tabId]) {
          phishingTabInfo[tabId].score += 10;
          phishingTabInfo[tabId].reasons.push("Many ads/popups detected");
          if (phishingTabInfo[tabId].score > 100) phishingTabInfo[tabId].score = 100;
        }
      }
      return { cancel: false };
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  []
);


// ======================= Phishing Logic =======================
function calculatePhishingInfo(tab) {
  let score = 0;
  const reasons = [];
  const url = tab.url || "";

  // No HTTPS
  if (!url.startsWith("https://")) {
    score += 50;
    reasons.push("Site is not using HTTPS");
  }

  // Contains IP address
  if (/https?:\/\/(\d{1,3}\.){3}\d{1,3}/.test(url)) {
    score += 20;
    reasons.push("URL contains IP address");
  }

  // Long URL
  if (url.length > 60) {
    score += 10;
    reasons.push("URL is unusually long");
  }

  // Suspicious keywords
  const suspiciousKeywords = [
    "login", "secure", "update", "verify", "account", "bank",
    "paypal", "password", "signin", "alert", "urgent", "confirm", "reset"
  ];
  suspiciousKeywords.forEach((keyword) => {
    if (url.toLowerCase().includes(keyword)) {
      score += 7;
      reasons.push("Suspicious keyword: " + keyword);
    }
  });

  // Blacklist
  const blacklist = ["phishingsite.com", "malicious-site.net", "badsite.org"];
  if (blacklist.some((domain) => url.includes(domain))) {
    score += 30;
    reasons.push("Reported phishing site");
  }

  // Lookalike domains
  const lookalikePatterns = [
    { real: "facebook.com", fake: /face[b8][o0]{2}k\.com/ },
    { real: "google.com", fake: /g[o0]{2}gle\.com/ },
    { real: "paypal.com", fake: /paypa[l1]\.com/ },
    { real: "twitter.com", fake: /twitt[e3]r\.com/ }
  ];
  lookalikePatterns.forEach(({ real, fake }) => {
    if (fake.test(url)) {
      score += 25;
      reasons.push("Domain looks like " + real);
    }
  });

  if (score > 100) score = 100;

  return { score, reasons, url };
}


// ======================= Update on Tab Change =======================
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const info = calculatePhishingInfo(tab);
    phishingTabInfo[tabId] = info;

    chrome.storage.local.get(["showAlerts"], (result) => {
      const showAlerts = result.showAlerts !== false;

      if (info.score > 70 && showAlerts) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/128.png",
          title: info.score > 80 ? "Phishing Alert!" : "Phishing Warning!",
          message: "This site may be phishing! (" + info.score + "%)\n" + info.reasons.slice(0, 2).join(", ")
        });
      }
    });
  }
});


// ======================= Respond to Popup Messages =======================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getPhishingInfo" && message.tabId) {
    const tabId = message.tabId;

    // Cached info available
    if (phishingTabInfo[tabId]) {
      sendResponse({
        type: "phishingInfo",
        ...phishingTabInfo[tabId]
      });
      return true;
    }

    // No cache → fetch from tab
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError || !tab || !tab.url) {
        sendResponse({ type: "phishingInfo", score: 0, reasons: [], url: "" });
        return;
      }

      const info = calculatePhishingInfo(tab);
      phishingTabInfo[tabId] = info;

      sendResponse({
        type: "phishingInfo",
        ...info
      });
    });

    return true; // async
  }

  return true;
});
