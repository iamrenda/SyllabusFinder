import { useState } from "react";
import ClassList from "./ClassList.jsx";
import CollectedSyllabuses from "../collectedSyllabuses/CollectedSyllabuses.jsx";

function Classes({ classes }) {
  const [selectedClass, setSelectedClass] = useState({});

  if (!classes || Object.keys(classes).length === 0) {
    return <h1>CoursePowerの講義一覧にアクセスしてください</h1>;
  }

  if (Object.keys(selectedClass).length !== 0) {
    return <CollectedSyllabuses selectedClass={selectedClass} setSelectedClass={setSelectedClass} />;
  }

  return (
    <ul className="flex flex-col gap-5">
      {Object.entries(classes).map(([dayLabel, classItems], i) => (
        <ClassList dayLabel={dayLabel} classItems={classItems} setSelectedClass={setSelectedClass} key={i} />
      ))}
    </ul>
  );
}

export default Classes;
