import { useContext, useState } from "react";
import faculties from "../../../../public/faculties.json";
import FacultyElement from "./FacultyElement";
import Button from "../../components/Button";
import storeClasses from "../../../scripts/storeClasses";
import requestScrapeFromPage from "../../../scripts/requestScrapeFromPage";
import Syllabus from "../classes/collectedSyllabuses/Syllabus";
import { SyllabusFinderContext } from "../../Context/SyllabusFinderContext";

async function storeMajor(tempMajor) {
    try {
        await chrome.storage.local.set({ selectedMajor: tempMajor });

        return tempMajor;
    } catch (error) {
        console.error("Error storing selected major:", error);
        throw new Error("学科を保存できませんでした。");
    }
}

async function submitButton(tempMajor, setIsLoading, setClasses, setSelectedMajor) {
    setIsLoading(true);

    try {
        const major = await storeMajor(tempMajor);
        setSelectedMajor(major);

        const classInfo = await requestScrapeFromPage();
        if (!classInfo || Object.keys(classInfo).length === 0) {
            throw new Error("クラス情報の取得に失敗しました。");
        }
        await chrome.storage.local.set({ classInfo });

        await storeClasses(major, setClasses);

        alert("シラバスの取得が完了しました！");
    } catch (error) {
        setIsLoading(false);
        console.error("Error in submitButton:", error);
    }

    setIsLoading(false);
}

function Majors() {
    const { setIsLoading, setClasses, setSelectedMajor, selectedMajor } = useContext(SyllabusFinderContext);
    const [tempMajor, setTempMajor] = useState(selectedMajor);

    return (
        <div className="h-48 rounded-lg px-5 py-4">
            <div className="mb-3">
                <h1 className="text-2xl">Syllabus Finder</h1>
                <p className="text-base">
                    あなたの学科: <span>{tempMajor || "未選択"}</span>
                </p>
            </div>

            <ul className="flex flex-col gap-5 mb-6">
                {faculties.map((faculty, index) => (
                    <FacultyElement
                        faculty={faculty}
                        isLast={index === faculties.length - 1}
                        selectedMajor={tempMajor}
                        setSelectedMajor={setTempMajor}
                        key={index}
                    />
                ))}
            </ul>

            {tempMajor && (
                <Button handleClick={() => submitButton(tempMajor, setIsLoading, setClasses, setSelectedMajor)}>
                    {tempMajor}に決定する
                </Button>
            )}
        </div>
    );
}

export default Majors;
