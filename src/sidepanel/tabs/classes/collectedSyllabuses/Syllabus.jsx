import { FaRegCreditCard, FaPencil } from "react-icons/fa6";
import { FaChalkboardTeacher, FaSchool, FaRegCommentDots, FaUserCheck } from "react-icons/fa";
import { useState } from "react";
import InfoField from "../../../components/InfoField";

function Syllabus({ syllabus, selectedSyllabusID, setSelectedSyllabusID }) {
  const { day, lectureName, lecturer, period, isOnline } = syllabus.classInfo;
  const { additionalInfo, campus, credits, grade, syllabusID, subject } = syllabus.syllabus;

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = syllabusID === selectedSyllabusID;

  return (
    <div
      className={`relative flex items-center gap-3 rounded-2xl py-3.5 px-1.5 shadow-sm h-44 hover:cursor-pointer outline outline-blue-600 transition-all duration-150 ${
        !isHovered && "hover:outline-1.5"
      } ${isSelected && "outline-1.5"}`}
      onClick={() => setSelectedSyllabusID(syllabusID)}
    >
      <div className="flex flex-col items-center text-base w-12 flex-shrink-0 text-gray-500">
        <p>{isOnline ? "*" : period}</p>
        <p>({day[0]})</p>
      </div>

      <div className="pl-3 h-full flex flex-col justify-center flex-grow border-gray-200 border-l-2">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight pb-2.5">{lectureName || "講師未定"}</h3>

        <div className="mt-1 grid grid-cols-2 gap-1 text-sm text-gray-600 space-x-4">
          <InfoField Icon={FaChalkboardTeacher}>{lecturer}</InfoField>
          <InfoField Icon={FaPencil}>{subject}</InfoField>
          <InfoField Icon={FaUserCheck}>{grade}</InfoField>
          <InfoField Icon={FaRegCreditCard}>{credits ? `${credits}単位` : "情報なし"}</InfoField>
          <InfoField Icon={FaSchool}>{campus}</InfoField>
          <InfoField Icon={FaRegCommentDots}>{additionalInfo && additionalInfo.slice(1, -1)}</InfoField>
        </div>

        <a
          href={`https://aoyama-syllabus-link/${syllabusID}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-2 text-sm text-blue-600 font-medium hover:underline"
        >
          シラバスを確認する →
        </a>
      </div>
    </div>
  );
}

export default Syllabus;
