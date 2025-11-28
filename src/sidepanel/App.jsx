import "../styles/index.css";
import { useContext, useEffect, useState } from "react";
import Classes from "./tabs/classes/classes/Classes";
import Majors from "./tabs/majors/Majors";
import About from "./tabs/about/About";
import Nav from "./components/Nav";
import LoadingScreen from "./components/Loading";
import storeClasses from "../scripts/storeClasses";
import Error from "./components/Error";
import requestScrapeFromPage from "../scripts/requestScrapeFromPage";
import { SyllabusFinderContext } from "./Context/SyllabusFinderContext";

async function reload(selectedMajor, setClasses, setIsLoading) {
    setIsLoading(true);

    try {
        let { classInfo } = await chrome.storage.local.get("classInfo");

        if (!classInfo || Object.keys(classInfo).length === 0) {
            try {
                const scrapedClassInfo = await requestScrapeFromPage();
                await chrome.storage.local.set({ classInfo: scrapedClassInfo });

                if (!scrapedClassInfo || Object.keys(scrapedClassInfo).length === 0) {
                    alert("シラバス情報の取得に失敗しました。\nCoursePowerの講義一覧にアクセスしてください。");
                    return;
                }
            } catch (scrapeErr) {
                console.error("Scrape failed:", scrapeErr);
                alert("シラバス情報の取得に失敗しました。\nCoursePowerの講義一覧にアクセスしてください。");
                return;
            }
        }

        await storeClasses(selectedMajor, setClasses);

        alert("シラバスの再取得が完了しました！");
    } catch (error) {
        console.error(error);
        alert("シラバスの再取得に失敗しました。");
    } finally {
        setIsLoading(false);
    }
}

function App() {
    const { isLoading, setIsLoading, classes, setClasses, selectedMajor, setSelectedMajor } =
        useContext(SyllabusFinderContext);
    const [activeTab, setActiveTab] = useState("classes");

    useEffect(() => {
        async function loadClasses() {
            const res = await chrome.storage.local.get("classes");
            setClasses(res.classes || {});
        }

        loadClasses();
    }, [setClasses]);

    useEffect(() => {
        async function loadMajor() {
            const res = await chrome.storage.local.get("selectedMajor");
            setSelectedMajor(res.selectedMajor || "");
        }

        loadMajor();
    }, [setSelectedMajor]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!selectedMajor) {
        return <Majors />;
    }

    if (!classes || Object.keys(classes).length === 0) {
        return <Error handleClick={() => reload(selectedMajor, setClasses, setIsLoading)} />;
    }

    return (
        <div className="h-screen bg-white flex flex-col">
            <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 overflow-y-auto p-3">
                {activeTab === "classes" && <Classes classes={classes} />}
                {activeTab === "about" && <About />}
            </div>
        </div>
    );
}

export default App;
