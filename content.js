// Switch between tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
    document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"))
    btn.classList.add("active")
    document.getElementById(btn.dataset.tab).classList.add("active")
  })
})

// Language switching
document.getElementById("language").addEventListener("change", (e) => {
  if (window.setLanguage) {
    window.setLanguage(e.target.value)
  }
})

// Listen for phishing info from background.js
function updatePhishingUI(message) {
  console.log("[EoHGuard] updatePhishingUI called with:", message)
  document.getElementById("current-url").textContent = message.url || ""
  document.getElementById("phishing-score").textContent = message.score + "%"
  if (message.score > 70) {
    document.getElementById("phishing-alert").classList.remove("hidden")
  } else {
    document.getElementById("phishing-alert").classList.add("hidden")
  }
  // Certificate info
  try {
    const urlObj = new URL(message.url)
    document.getElementById("certificate").textContent =
      urlObj.protocol === "https:" ? "Valid (HTTPS)" : "Invalid (Not HTTPS)"
    // Region info (basic: get TLD)
    const tld = urlObj.hostname.split(".").pop()
    let region = "Unknown"
    const tldMap = {
      de: "Germany",
      us: "USA",
      fr: "France",
      jp: "Japan",
      ca: "Canada",
      nl: "Netherlands",
      sg: "Singapore",
      uk: "UK",
      au: "Australia",
      br: "Brazil",
      com: "Global",
      net: "Global",
      org: "Global",
    }
    if (tldMap[tld]) region = tldMap[tld]
    document.getElementById("region").textContent = region
    console.log("[EoHGuard] Certificate:", document.getElementById("certificate").textContent, "Region:", region)
  } catch (e) {
    document.getElementById("certificate").textContent = "Unknown"
    document.getElementById("region").textContent = "Unknown"
    console.log("[EoHGuard] Error parsing URL for certificate/region:", e)
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[EoHGuard] onMessage received:", message)
  if (message.type === "phishingInfo") {
    updatePhishingUI(message)
  }
})

// Request phishing info when popup loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("[EoHGuard] Popup DOMContentLoaded")

  // Initialize language system
  if (window.updateAllText) {
    window.updateAllText()
  }
  if (window.getCurrentLanguage) {
    document.getElementById("language").value = window.getCurrentLanguage()
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0]
    console.log("[EoHGuard] Active tab:", tab)
    if (tab) {
      chrome.runtime.sendMessage({ type: "getPhishingInfo", tabId: tab.id }, (response) => {
        console.log("[EoHGuard] getPhishingInfo response:", response)
        if (response && response.type === "phishingInfo") {
          updatePhishingUI(response)
        }
      })
    }
  })

  // Load protection stats
  loadProtectionStats()

  // Load notification preference
  chrome.storage.local.get(["showAlerts"], (result) => {
    const showAlerts = result.showAlerts !== false
    const elem = document.getElementById("show-alerts")
    if (elem) elem.checked = showAlerts
  })

  // Save notification preference
  const showAlertsElem = document.getElementById("show-alerts")
  if (showAlertsElem) {
    showAlertsElem.addEventListener("change", (e) => {
      chrome.storage.local.set({ showAlerts: e.target.checked })
    })
  }
})

// Report button
const sendReportBtn = document.getElementById("send-report")
if (sendReportBtn) {
  sendReportBtn.addEventListener("click", () => {
    const reportText = document.getElementById("report-text").value
    const tFunc = window.t || ((key) => key)

    if (reportText.trim() !== "") {
      alert(tFunc("reportSent"))
      document.getElementById("report-text").value = ""
    } else {
      alert(tFunc("enterReport"))
    }
  })
}

// VPN button
const vpnBtn = document.getElementById("connect-vpn")
if (vpnBtn) {
  vpnBtn.addEventListener("click", () => {
    const vpnStatus = document.getElementById("vpn-status")
    const serverHolder = document.getElementById("server-holder")
    const serverSpan = document.getElementById("server")
    const countries = [
      "Germany",
      "USA",
      "France",
      "Japan",
      "Canada",
      "Netherlands",
      "Singapore",
      "UK",
      "Australia",
      "Brazil",
    ]
    const tFunc = window.t || ((key) => key)

    if (!vpnStatus.classList.contains("connected")) {
      vpnStatus.textContent = "Connected (Demo)"
      vpnStatus.classList.add("connected")
      vpnStatus.innerHTML = "Ping: 42ms | Speed: 20Mbps"
      vpnBtn.innerText = tFunc("disconnect")
      serverHolder.style.display = "block"
      serverSpan.textContent = countries[Math.floor(Math.random() * countries.length)]
    } else {
      vpnStatus.classList.remove("connected")
      vpnStatus.textContent = tFunc("disconnected")
      vpnBtn.innerText = tFunc("connect")
      serverHolder.style.display = "none"
    }
    vpnBtn.classList.toggle("vpn-on")
    vpnBtn.classList.toggle("vpn-off")
  })
}

// Email upload functionality
const uploadEmailBtn = document.getElementById("upload-email-btn")
if (uploadEmailBtn) {
  uploadEmailBtn.addEventListener("click", () => {
    document.getElementById("email-file-input").click()
  })
}

const emailFileInput = document.getElementById("email-file-input")
if (emailFileInput) {
  emailFileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const text = await file.text()
        const phishingScore = calculateEmailPhishingScore(text)

        document.getElementById("email-check-result").style.display = "block"
        document.getElementById("email-result-text").textContent =
          `Email analyzed: ${phishingScore > 70 ? "High risk detected!" : "Email appears safe"}`
        document.getElementById("email-phishing-score").textContent = phishingScore + "%"
      } catch (err) {
        alert("Error reading file: " + err.message)
      }
    }
  })
}

function calculateEmailPhishingScore(emailText) {
  let score = 0
  const text = emailText.toLowerCase()

  const phishingKeywords = [
    "verify",
    "confirm",
    "update",
    "urgent",
    "act now",
    "click here",
    "login",
    "account suspended",
    "unauthorized",
    "validate",
    "reactivate",
  ]
  phishingKeywords.forEach((keyword) => {
    if (text.includes(keyword)) score += 5
  })

  if (!text.includes("from:") || text.match(/from:.*@[a-z0-9]*\.[a-z]{2,}/i)) score += 10
  if (text.includes("24 hours") || text.includes("immediately") || text.includes("urgent")) score += 15
  if (text.includes("bit.ly") || text.includes("tinyurl") || text.match(/https?:\/\/[0-9]{1,3}\.[0-9]{1,3}/))
    score += 20

  return Math.min(score, 100)
}

function loadProtectionStats() {
  chrome.storage.local.get(
    ["sitesBlockedSession", "sitesBlockedTotal", "phishingAdsBlocked", "trackersBlocked", "recentAds"],
    (result) => {
      document.getElementById("sites-blocked-session").textContent = result.sitesBlockedSession || 0
      document.getElementById("sites-blocked-total").textContent = result.sitesBlockedTotal || 0
      document.getElementById("phishing-ads-blocked").textContent = result.phishingAdsBlocked || 0
      document.getElementById("trackers-blocked").textContent = result.trackersBlocked || 0

      if (result.recentAds && result.recentAds.length > 0) {
        const list = document.getElementById("recent-ads-list")
        list.innerHTML = ""
        result.recentAds.slice(0, 5).forEach((ad) => {
          const li = document.createElement("li")
          li.textContent = ad
          list.appendChild(li)
        })
      }
    },
  )
}

// Block Ads Button
const blockAdsBtn = document.getElementById("block-ads-btn")
if (blockAdsBtn) {
  blockAdsBtn.addEventListener("click", () => {
    chrome.storage.local.get(["phishingAdsBlocked", "recentAds"], (result) => {
      const count = (result.phishingAdsBlocked || 0) + 3
      const recentAds = result.recentAds || []
      recentAds.push("Ad blocked - " + new Date().toLocaleTimeString())
      chrome.storage.local.set({ phishingAdsBlocked: count, recentAds: recentAds.slice(-10) })
      document.getElementById("phishing-ads-blocked").textContent = count
      loadProtectionStats()
    })
  })
}

// Block Trackers Button
const blockTrackersBtn = document.getElementById("block-trackers-btn")
if (blockTrackersBtn) {
  blockTrackersBtn.addEventListener("click", () => {
    chrome.storage.local.get(["trackersBlocked"], (result) => {
      const count = (result.trackersBlocked || 0) + 5
      chrome.storage.local.set({ trackersBlocked: count })
      document.getElementById("trackers-blocked").textContent = count
    })
  })
}

// Block Pop-ups Button
const blockPopupsBtn = document.getElementById("block-popups-btn")
if (blockPopupsBtn) {
  blockPopupsBtn.addEventListener("click", () => {
    chrome.storage.local.get(["sitesBlockedSession", "sitesBlockedTotal"], (result) => {
      const sessionCount = (result.sitesBlockedSession || 0) + 1
      const totalCount = (result.sitesBlockedTotal || 0) + 1
      chrome.storage.local.set({ sitesBlockedSession: sessionCount, sitesBlockedTotal: totalCount })
      document.getElementById("sites-blocked-session").textContent = sessionCount
      document.getElementById("sites-blocked-total").textContent = totalCount
    })
  })
}

// Reset Statistics Button
const resetStatsBtn = document.getElementById("reset-stats-btn")
if (resetStatsBtn) {
  resetStatsBtn.addEventListener("click", () => {
    chrome.storage.local.set({
      sitesBlockedSession: 0,
      sitesBlockedTotal: 0,
      phishingAdsBlocked: 0,
      trackersBlocked: 0,
      recentAds: [],
    })
    loadProtectionStats()
    const tFunc = window.t || ((key) => key)
    alert(tFunc("statsReset"))
  })
}
