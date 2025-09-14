import buildSyllabusUrl from "./buildSyllabusUrl.js";

const MAJOR = "情報テクノロジー学科";

function parseSyllabus(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const linkElement = doc.getElementById("CPH1_gvw_kensaku_lnkShousai_0");
  return linkElement ? `https://syllabus.aoyama.ac.jp/${linkElement.getAttribute("href")}` : null;
}

function fetchSyllabus(url) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "FETCH_SYLLABUS", url }, (response) => {
      if (response?.error) reject(response.error);
      else resolve(parseSyllabus(response.html));
    });
  });
}

function createButton() {
  const button = document.createElement("button");
  button.innerText = "Syllabus";
  button.style.margin = "5px";
  button.style.padding = "3px 8px";
  button.style.fontSize = "12px";
  button.style.cursor = "pointer";
  button.style.position = "absolute";

  return button;
}

async function handleButtonClick(e, { courseCard, dayLabel }) {
  e.preventDefault();

  const periodTermText = courseCard.querySelector(".courseCardInfo")?.textContent.trim() || "";
  const [period, term] = periodTermText.split(/\s+/); // First part is period, next is term

  const lectureName = courseCard.querySelector(".courseCardName")?.textContent.trim() || "";
  //   const lecturer = courseCard.querySelector(".courseCardUser")?.textContent.trim() || "";
  const lecturer = "";

  const data = {
    lectureName,
    lecturer,
    day: dayLabel,
    period: period || "",
    major: MAJOR,
    term: term || "",
  };

  const syllabusSearchURL = buildSyllabusUrl(data);

  try {
    const link = await fetchSyllabus(syllabusSearchURL);
    window.location.href = link;
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
}

(function () {
  // Goes through every week days
  document.querySelectorAll(".weeklyCourseArea .dayBox").forEach((dayBox) => {
    const dayLabel = dayBox.querySelector(".cpLabel.orange")?.textContent.trim() || "";

    if (dayLabel === "その他" || dayLabel === "") {
      return;
    }

    // Goes through every lecture from given days
    dayBox.querySelectorAll(".courseCard").forEach((courseCard) => {
      const button = createButton();

      button.addEventListener("click", (e) => handleButtonClick(e, { courseCard, dayLabel }));
      courseCard.appendChild(button);
      courseCard.style.position = "relative";
    });
  });
})();
