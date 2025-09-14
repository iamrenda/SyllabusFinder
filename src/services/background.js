chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type !== "FETCH_SYLLABUS") return;

  fetch(message.url)
    .then((res) => res.text())
    .then((html) => sendResponse({ html }))
    .catch((err) => sendResponse({ error: err.message }));

  return true; // Keep the message channel open
});
