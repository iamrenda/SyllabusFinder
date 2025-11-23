async function requestScrapeFromPage() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tab.id, { action: "scrape" }, (response) => {
            if (!response) {
                return reject(new Error("No response from content script"));
            }

            response.ok ? resolve(response.classInfo) : reject(new Error(response.error));
        });
    });
}

export default requestScrapeFromPage;
