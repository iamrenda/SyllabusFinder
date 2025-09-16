import buildSyllabusSearchUrl from "./buildSyllabusSearchUrl.js";
import fetchSyllabusSearchDoc from "./fetchSyllabusSearchDoc.js";
// import showSyllabusResults from "./showSyllabusResults.js";

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

async function getMajor() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("major", (result) => {
      if (!result) {
        reject("Error fetching major from local chrome storage");
      }

      resolve(result["major"]);
    });
  });
}

async function searchSyllabus(searchData) {
  const syllabusSearchURL = await buildSyllabusSearchUrl(searchData);
  console.log("Searching:", syllabusSearchURL);

  const syllabusSearchDoc = await fetchSyllabusSearchDoc(syllabusSearchURL);
  const syllabusSearchResults = [...syllabusSearchDoc.querySelectorAll("#CPH1_gvw_kensaku tbody tr")];

  return { syllabusSearchDoc, syllabusSearchResults };
}

async function handleButtonClick(e, { courseCard, dayLabel }) {
  e.preventDefault();

  const major = await getMajor();

  const periodTermText = courseCard.querySelector(".courseCardInfo")?.textContent.trim() || "";
  const [period, term] = periodTermText.split(/\s+/);

  const lectureName = courseCard.querySelector(".courseCardName")?.textContent.trim() || "";
  const lecturerRaw = courseCard.querySelector(".courseCardUser");
  const lecturer = [...lecturerRaw.childNodes][0].textContent || "";

  let data = {
    lectureName,
    lecturer: lecturer.replace(/["ほか"]/g, "").trim(),
    day: dayLabel,
    period: period || "",
    major: major,
    term: term || "",
  };

  try {
    // First attempt: with lecturer
    let { syllabusSearchDoc, syllabusSearchResults } = await searchSyllabus(data);

    // Retry if nothing found (remove lecturer)
    if (syllabusSearchResults.length === 0) {
      console.warn("No syllabus found with lecturer. Retrying without lecturer...");
      data = { ...data, lecturer: "" };
      ({ syllabusSearchDoc, syllabusSearchResults } = await searchSyllabus(data));
    }

    // Still nothing found
    if (syllabusSearchResults.length === 0) {
      return alert("No syllabus found :(");
    }

    // 1 syllabus search result
    if (syllabusSearchResults.length === 1) {
      const linkElement = syllabusSearchDoc.getElementById("CPH1_gvw_kensaku_lnkShousai_0");
      const link = `https://syllabus.aoyama.ac.jp/${linkElement.getAttribute("href")}`;

      return (window.location.href = link);
    }

    // 2+ syllabus search results
    const syllabusResults = syllabusSearchResults.map((searchResult) => ({
      period: searchResult.querySelector(".col2")?.textContent.trim() || "",
      subject: searchResult.querySelector(".col3")?.textContent.trim() || "",
      teacher: searchResult.querySelector(".col4")?.textContent.trim() || "",
      credits: searchResult.querySelector(".col6")?.textContent.trim() || "",
      faculty: searchResult.querySelector(".col7")?.textContent.trim() || "",
      syllabusID: searchResult.querySelector(".col8 a")?.getAttribute("href") || "",
    }));

    alert("More than one syllabus found. Bringing you to the first syllabus found. Please check details.");
    const link = `https://syllabus.aoyama.ac.jp/${syllabusResults[0].syllabusID}`;
    window.location.href = link;

    // Or if you want the popup:
    // showSyllabusResults(syllabusResults);
  } catch (err) {
    alert("Error fetching syllabus. Please try again later.");
    console.error(err);
  }
}

(function () {
  document.querySelectorAll(".weeklyCourseArea .dayBox").forEach((dayBox) => {
    const dayLabel = dayBox.querySelector(".cpLabel.orange")?.textContent.trim() || "";

    if (dayLabel === "その他" || dayLabel === "") {
      return;
    }

    dayBox.querySelectorAll(".courseCard").forEach((courseCard) => {
      const button = createButton();

      button.addEventListener("click", (e) => handleButtonClick(e, { courseCard, dayLabel }));
      courseCard.appendChild(button);
      courseCard.style.position = "relative";
    });
  });
})();
