import buildSyllabusSearchUrl from "./buildSyllabusSearchUrl";
import fetchSyllabusSearchDoc from "./fetchSyllabusSearchDoc";

async function searchSyllabus(searchData) {
  const syllabusSearchURL = await buildSyllabusSearchUrl(searchData);
  console.log("Searching:", syllabusSearchURL);

  const syllabusSearchDoc = await fetchSyllabusSearchDoc(syllabusSearchURL);
  const syllabusSearchResults = [...syllabusSearchDoc.querySelectorAll("#CPH1_gvw_kensaku tbody tr")];

  return { syllabusSearchDoc, syllabusSearchResults };
}

export default searchSyllabus;
