// It will only fetch the doc html from Syllabus search url
function fetchSyllabusSearchDoc(url) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "FETCH_SYLLABUS", url }, (response) => {
      if (response?.error) {
        return reject(response.error);
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(response.html, "text/html");
      resolve(doc);
    });
  });
}

export default fetchSyllabusSearchDoc;
