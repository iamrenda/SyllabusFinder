/**
 * Gets the first syllabus URL that was found from the given URL
 *
 * @param {*} searchUrl must build from buildSyllabusUrl
 * @returns the link to the first syllabus that was found (if not found, null)
 */
async function getSyllabusLink(searchUrl) {
  const response = await fetch(searchUrl);
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const linkElement = doc.getElementById("CPH1_gvw_kensaku_lnkShousai_0");

  return linkElement ? `https://syllabus.aoyama.ac.jp/${linkElement.getAttribute("href")}` : null;
}

export default getSyllabusLink;
