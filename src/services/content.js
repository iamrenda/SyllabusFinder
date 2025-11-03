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

async function scrapeClassInfo(courseCard, dayLabel) {
  const major = await getMajor();

  const periodTermText = courseCard.querySelector(".courseCardInfo")?.textContent.trim() || "";
  const [period, term] = periodTermText.split(/\s+/);

  const lectureName = courseCard.querySelector(".courseCardName")?.textContent.trim() || "";
  const lecturerRaw = courseCard.querySelector(".courseCardUser");
  const lecturer = [...lecturerRaw.childNodes][0].textContent || "";

  return {
    lectureName,
    lecturer: lecturer.replace(/["ほか"]/g, "").trim(),
    day: dayLabel,
    period: period || "",
    major: major,
    term: term || "",
    isOnline: period === "オンライン",
  };
}

// async function handleButtonClick(e, { courseCard, dayLabel }) {
//   e.preventDefault();

//   const major = await getMajor();

//   const periodTermText = courseCard.querySelector(".courseCardInfo")?.textContent.trim() || "";
//   const [period, term] = periodTermText.split(/\s+/);

//   const lectureName = courseCard.querySelector(".courseCardName")?.textContent.trim() || "";
//   const lecturerRaw = courseCard.querySelector(".courseCardUser");
//   const lecturer = [...lecturerRaw.childNodes][0].textContent || "";

//   let searchFilters = {
//     lectureName,
//     lecturer: lecturer.replace(/["ほか"]/g, "").trim(),
//     day: dayLabel,
//     period: period || "",
//     major: major,
//     term: term || "",
//     isOnline: period === "オンライン",
//   };

//   try {
//     // First attempt: with lecturer
//     let { syllabusSearchDoc, syllabusSearchResults } = await searchSyllabus(searchFilters);

//     // Retry if nothing found (remove lecturer)
//     if (syllabusSearchResults.length === 0) {
//       console.warn("No syllabus found with lecturer. Retrying without lecturer...");
//       searchFilters = { ...searchFilters, lecturer: "" };
//       ({ syllabusSearchDoc, syllabusSearchResults } = await searchSyllabus(searchFilters));
//     }

//     // Still nothing found
//     if (syllabusSearchResults.length === 0) {
//       return alert("No syllabus found :(");
//     }

//     // 1 syllabus search result
//     if (syllabusSearchResults.length === 1) {
//       const linkElement = syllabusSearchDoc.getElementById("CPH1_gvw_kensaku_lnkShousai_0");
//       const link = `https://syllabus.aoyama.ac.jp/${linkElement.getAttribute("href")}`;

//       window.location.href = link;
//       return;
//     }

//     // 2+ syllabus search results
//     const syllabusResults = syllabusSearchResults.map((searchResult) => ({
//       period: searchResult.querySelector(".col2")?.textContent.trim() || "",
//       subject: searchResult.querySelector(".col3")?.textContent.trim() || "",
//       teacher: searchResult.querySelector(".col4")?.textContent.trim() || "",
//       credits: searchResult.querySelector(".col6")?.textContent.trim() || "",
//       faculty: searchResult.querySelector(".col7")?.textContent.trim() || "",
//       syllabusID: searchResult.querySelector(".col8 a")?.getAttribute("href") || "",
//     }));

//     await chrome.runtime.sendMessage({
//       type: "UPDATE_CLASSES",
//       payload: {
//         searchFilters,
//         syllabusResults,
//       },
//     });
//   } catch (err) {
//     alert("Error fetching syllabus. Please try again later.");
//     console.error(err);
//   }
// }

(async function () {
  const { classes: storedClasses } = (await chrome.storage.local.get("classes")) || {};

  if (Object.keys(storedClasses || {}).length > 0) {
    console.log("Classes already found, skipping scraping");
    return;
  }

  const dayBoxes = document.querySelectorAll(".weeklyCourseArea .dayBox");
  const classes = {};
  const dayTasks = [];

  for (const dayBox of dayBoxes) {
    const dayLabel = dayBox.querySelector(".cpLabel.orange")?.textContent.trim() || "";

    if (dayLabel === "その他" || dayLabel === "") {
      continue;
    }

    const courseCards = dayBox.querySelectorAll(".courseCard");
    const courseTasks = [...courseCards].map((courseCard) => scrapeClassInfo(courseCard, dayLabel));

    const dayTask = Promise.all(courseTasks).then((dailyClasses) => {
      classes[dayLabel] = dailyClasses;
    });

    dayTasks.push(dayTask);
  }

  await Promise.all(dayTasks);
  await chrome.storage.local.set({ classes: classes });
  console.log(`storing ${classes}`);
})();
