import { useState } from "react";
import Button from "../../../util/Button";
import SearchFilter from "./SearchFilter";
import Syllabus from "./Syllabus";

function CollectedSyllabuses({ selectedClass }) {
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
      <Button isDisabled={!selectedSyllabusID} handleClick={() => alert("clicked")}>
        クラスを保存する
      </Button>
    </div>
  );
}

export default CollectedSyllabuses;
