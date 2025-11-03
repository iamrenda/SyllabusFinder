function Syllabus({ syllabus }) {
  const { subject, credits, faculty, period, teacher, syllabusID } = syllabus;

  const syllabusURL = `https://syllabus.aoyama.ac.jp/${syllabusID}`;

  return (
    <li>
      <a href={syllabusURL} target="_blank" rel="noopener noreferrer">
        {subject}
      </a>
      <p>単位: {credits}</p>
      <p>科目区分: {faculty}</p>
      <p>開講曜日・期間: {period}</p>
      <p>担当教員: {teacher}</p>
      <button>セーブする</button>
    </li>
  );
}

export default Syllabus;
