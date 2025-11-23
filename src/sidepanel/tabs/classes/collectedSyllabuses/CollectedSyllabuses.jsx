import { useState } from "react";
import Button from "../../../components/Button";
import SearchFilter from "./SearchFilter";
import Syllabus from "./Syllabus";

async function handleClick(classes, selectedClass, setSelectedClass, selectedSyllabusID, setSelectedSyllabusID) {
  const { day } = selectedClass.classInfo;

  const newClasses = structuredClone(classes);

  newClasses[day] = newClasses[day].map((classItem) =>
    classItem.syllabusID === syllabusID ? updatedClass : classItem
  );

  if (updatedClass.syllabuses.length === 0) {
    alert("シラバスの保存に失敗しました。もう一度お試しください。");
    console.error("Selected syllabus not found in the selected class.");
    return;
  }

  try {
    await chrome.storage.local.set({ classes: updatedClass });

    setSelectedClass({});
    alert("シラバスを保存しました！");
    setSelectedSyllabusID(null);
  } catch (e) {
    console.error("Error saving syllabus:", e);
    alert("シラバスの保存に失敗しました。もう一度お試しください。");
  }
}

function CollectedSyllabuses({ selectedClass, setSelectedClass }) {
  const [selectedSyllabusID, setSelectedSyllabusID] = useState(null);

  return (
    <div>
      <div className="flex flex-col pb-5">
        <p className="text-sm">検索フィルタ</p>
        <SearchFilter classInfo={selectedClass?.classInfo} />
      </div>

      <h1 className="text-base pb-1.5">{selectedClass.syllabuses?.length}件のシラバスが見つかりました</h1>
      <ul className="flex flex-col gap-4.5 mb-4">
        {selectedClass.syllabuses.map((syllabus) => (
          <Syllabus
            syllabus={{ classInfo: selectedClass.classInfo, syllabus: syllabus }}
            selectedSyllabusID={selectedSyllabusID}
            setSelectedSyllabusID={setSelectedSyllabusID}
          />
        ))}
      </ul>
      <Button
        isDisabled={!selectedSyllabusID}
        handleClick={() =>
          handleClick(classes, selectedClass, setSelectedClass, selectedSyllabusID, setSelectedSyllabusID)
        }
      >
        クラスを保存する
      </Button>
    </div>
  );
}

export default CollectedSyllabuses;
