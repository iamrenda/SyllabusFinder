import getMajorCodeByLabel from "./faculties.js";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const example = {
  title: "情報数学Ⅰ",
  lecturer: "",
  day: "金曜日",
  period: "2",
  major: "情報テクノロジー学科",
};

const days = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
function findDayIndex(dayInJapanese) {
  return days.indexOf(dayInJapanese) + 1; // 1 based
}

function buildSyllabusUrl({ title, lecturer, day, period, major, inPerson = false, online = false }) {
  const params = new URLSearchParams({
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __VIEWSTATEGENERATOR: "309A73F1",
    YR: "2025",
    BU: "BU1",
    KW: "",
    KM: title || "",
    KI: lecturer || "",
    DL: "ja",
    ctl00$CPH1$btnKensaku: "検索/Search",
    PC: "1",
    PI: "0",
  });

  if (day) {
    const dayIndex = findDayIndex(day);
    params.set(`YB${dayIndex}`, "on");
  }

  if (period) {
    params.set(`JG${period}`, "on");
  }

  if (major && major.length) {
    const majorCodes = getMajorCodeByLabel(major);
    majorCodes.forEach((major, index) => params.set(`GB1B_${index}`, major));
  }

  // In-person / Online
  if (inPerson) params.set("IP", "on");
  if (online) params.set("OL", "on");

  return `https://syllabus.aoyama.ac.jp/?${params.toString()}`;
}

async function getSyllabusLink(searchUrl) {
  const response = await fetch(searchUrl);
  const html = await response.text();

  const $ = cheerio.load(html);

  // Find the element by ID
  const element = $("#CPH1_gvw_kensaku_lnkShousai_0");

  if (element.length > 0) {
    const relativeHref = element.attr("href");
    return `https://syllabus.aoyama.ac.jp/${relativeHref}`;
  }
  return null;
}

(async () => {
  const searchUrl = buildSyllabusUrl(example);
  const syllabusLink = await getSyllabusLink(searchUrl);

  if (syllabusLink) {
    console.log("Syllabus Link:", syllabusLink);
  } else {
    console.log("No syllabus found.");
  }
})();
