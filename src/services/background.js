chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case "FETCH_SYLLABUS": {
      fetch(message.url)
        .then((res) => res.text())
        .then((html) => sendResponse({ html }))
        .catch((err) => sendResponse({ error: err.message }));
      return true;
    }

    case "UPDATE_CLASSES": {
      chrome.runtime.sendMessage({ type: "UPDATE_CLASSES", payload: message.payload });
      return true;
    }

    default:
      break;
  }
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
