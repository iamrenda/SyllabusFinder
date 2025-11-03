import faculties from "../../../../public/faculties.json";
import FacultyElement from "./FacultyElement";
import useChromeStorageState from "./useChromeStorageState";

function Majors() {
  const [selectedMajor, setSelectedMajor] = useChromeStorageState("major", null);

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

export default Majors;
