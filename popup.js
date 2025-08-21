function pillClass(score) {
  if (score >= 70) return "pill danger";
  if (score >= 40) return "pill warn";
  return "pill ok";
}

chrome.runtime.sendMessage({ type: "GET_PHISH_RESULT" }, function handlePhishResult(info) {
    // If background didn't answer (service worker asleep, permissions, etc.)
  if (chrome.runtime.lastError) {
    console.warn("GET_PHISH_RESULT error:", chrome.runtime.lastError.message);
    info = null;info = info || { url: "", score: 0, reasons: [] };}   // Fallback so we never read props of undefined
  const urlEl = document.getElementById("url");
  const scoreEl = document.getElementById("score");
  const reasonsEl = document.getElementById("reasons");

  if (urlEl)   urlEl.textContent = info.url || "(no data)";
  if (scoreEl) scoreEl.innerHTML = `Risk Score: <span class="${pillClass(info.score)}">${info.score}</span> / 100`;

  if (reasonsEl) {
    reasonsEl.innerHTML = (info.reasons || [])
      .map(r => `<div class="reason">• ${escapeHtml(r)}</div>`)
      .join("") || "<em>No obvious issues detected.</em>";
  } // <-- Close the reasonsEl block here

  document.getElementById("report").onclick = async () => {
    // TODO: wire this to your backend or Google Sheet webhook
    alert("Thanks for the report! (Hook me to your backend next.)");
  };
});

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}
