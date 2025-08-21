(function () {
  const url = location.href;
  const host = location.hostname;
  let reasons = [];
  let score = 0;

  // Simple checks
  if (location.protocol !== "https:") { score += 30; reasons.push("Connection is not HTTPS."); }
  if (host.includes("xn--")) { score += 25; reasons.push("Domain uses punycode (可能 look-alike)."); }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) { score += 25; reasons.push("Domain is a raw IP address."); }
  if (url.includes("@")) { score += 15; reasons.push("URL contains '@' (can hide real domain)."); }
  if (url.length > 100 || (url.match(/\//g) || []).length > 6) { score += 10; reasons.push("URL is unusually long/deep."); }
  const parts = host.split(".");
  if (parts.length >= 5 || host.split("-").length >= 4) { score += 10; reasons.push("Suspiciously complex domain."); }
  const susTLD = ["zip", "mov", "xyz", "top", "gq", "tk", "ml", "cf"];
  const tld = parts[parts.length - 1]?.toLowerCase();
  if (susTLD.includes(tld)) { score += 8; reasons.push(`Suspicious TLD: .${tld}`); }
  const passField = document.querySelector('input[type="password"]');
  if (passField) {
    const action = passField.closest("form")?.action || "";
    if (action && new URL(action, location.href).hostname !== host) {
      reasons.push("Password form sends data to another domain.");
    }
  }

  // --- DOM heuristics ---
  const forms = [...document.forms];
  const hasPassword = !!document.querySelector('input[type="password"]');
  if (hasPassword) {
    for (const f of forms) {
      const action = f.getAttribute("action") || "";
      try {
        const target = new URL(action, location.href);
        if (target.hostname && target.hostname !== host) {
          score += 25; reasons.push(`Password form sends data to another domain: ${target.hostname}.`);
          break;
        }
      } catch (_) {}
    }
  }

  // asking for credentials or 2FA codes
  const text = document.body?.innerText?.toLowerCase() || "";
  const wantsSecrets = ["password", "passcode", "one-time code", "otp", "2fa"].some(k => text.includes(k));
  if (wantsSecrets && !hostMatchesBrand(text, host)) {
    score += 20; reasons.push("Page asks for sensitive info but domain doesn't match brand.");
  }
  // Disable right-click / copy (common on scam pages)
  if (document.body?.oncontextmenu || document.body?.oncopy || document.body?.onpaste === false) {
    score += 5; reasons.push("Page disables right-click or copy/paste.");
  }
  // iFrame traps
  if (document.querySelectorAll("iframe").length >= 5) {
    score += 5; reasons.push("Page has excessive iframes (possible clickjacking).");
  }
  // Brand mismatch (super-light check)
  if (!hostMatchesBrand(text, host)) {
    score += 15; reasons.push("Domain does not match any known brand claims on the page.");
  }

  // Normalize + clamp
  score = Math.max(0, Math.min(100, score));
  reasons = reasons.filter(r => r).slice(0, 5); // limit to 5 reasons

  chrome.runtime.sendMessage({
    type: "PHISH_RESULT",
    payload: { score, reasons, url }
  });

  // --- helpers ---
  function hostMatchesBrand(pageText, hostname) {
    // super-light “brand mismatch” check
    const brands = ["google", "microsoft", "outlook", "office", "apple", "icloud", "facebook", "instagram", "paypal", "amazon", "netflix", "steam", "binance", "metamask"];
    const seen = brands.filter(b => pageText.includes(b));
    if (seen.length === 0) return true; // no brand claims → no mismatch
    return seen.some(b => hostname.includes(b));
  }
})();