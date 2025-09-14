import "./index.css";
import { faculties } from "./services/faculties";
import FacultyElement from "./features/FacultyElement";
import { useState } from "react";

function App() {
  const [selectedMajor, setSelectedMajor] = useState("情報テクノロジー学科");

  return (
    <div className="h-48 w-96 rounded-lg px-5 py-4">
      <div className="mb-3">
        <h1 className="text-2xl">Syllabus Finder</h1>
        <p className="text-base">
          あなたの学科: <span>{selectedMajor || "未選択"}</span>
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        {faculties.map((faculty, index) => (
          <FacultyElement
            faculty={faculty}
            isLast={index === faculties.length - 1}
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
