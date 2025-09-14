import getMajorCodeByLabel from "./faculties.js";

const days = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
function findDayIndex(dayInJapanese) {
  return days.indexOf(dayInJapanese) + 1; // 1 based
}

function buildSyllabusUrl({ lectureName, lecturer, day, period, major, term, inPerson = false, online = false }) {
  const params = new URLSearchParams({
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __VIEWSTATEGENERATOR: "309A73F1",
    YR: "2025",
    BU: "BU1",
    KW: "",
    KM: lectureName || "",
    KI: lecturer || "",
    GKB: "",
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

  if (term) {
    term === "前期" && params.set("GKB", "1.1.12");
    term === "後期" && params.set("GKB", "1.2.12");
  }

  // In-person / Online
  if (inPerson) params.set("IP", "on");
  if (online) params.set("OL", "on");

  return `https://syllabus.aoyama.ac.jp/?${params.toString()}`;
}

export default buildSyllabusUrl;
