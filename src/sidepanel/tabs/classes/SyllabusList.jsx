import Syllabus from "./Syllabus";

function SyllabusList({ syllabusResults }) {
  return (
    <ul>
      {syllabusResults?.map((syllabus, index) => (
        <Syllabus key={index} syllabus={syllabus} />
      ))}
    </ul>
  );
}

export default SyllabusList;
