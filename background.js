const RISK_CACHE = new Map(); // tabId -> { score, reasons, url }

chrome.webNavigation.onCommitted.addListener(async ({ tabId, url, frameId }) => {
  if (frameId !== 0) return; // only top frame
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
  } catch (e) {
    // ignore pages we can't script (e.g., chrome://)
  }
});

let lastPhishResult = {score: 0, reasons: [],  url: ""};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "PHISH_RESULT" && ss.tab) {
    lastPhishResult = msg.payload;
    RISK_CACHE.set(sender.tab.id, msg.payload);
  }
  if (msg.type === "GET_PHISH_RESULT") {
    // Try to get the result for the sender's tab
    const tabId = sender.tab?.id;
    const result = tabId ? RISK_CACHE.get(tabId) || lastPhishResult : lastPhishResult;
    sendResponse(result);
  }
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const info = RISK_CACHE.get(tabId);
  updateBadge(tabId, info?.score ?? 0);
});

function updateBadge(tabId, score) {
  const text = score >= 70 ? "⚠" : score >= 40 ? "!" : "";
  chrome.action.setBadgeText({ tabId, text });
  chrome.action.setBadgeBackgroundColor({
    tabId,
    color: score >= 70 ? "#d32f2f" : score >= 40 ? "#f9a825" : "#29b6f6"
  });
};
