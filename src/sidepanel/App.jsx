import "../styles/index.css";
import { useState } from "react";
import Classes from "./tabs/classes/classes";
import Majors from "./tabs/majors/Majors";

function App() {
  const [activeTab, setActiveTab] = useState("classes");

  return (
    <div className="w-[380px] h-screen bg-white flex flex-col">
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("classes")}
          className={`flex-1 py-2 font-medium ${
            activeTab === "classes" ? "border-b-2 border-blue-500" : ""
          } hover:cursor-pointer`}
        >
          クラス
        </button>
        <button
          onClick={() => setActiveTab("majors")}
          className={`flex-1 py-2 font-medium ${
            activeTab === "majors" ? "border-b-2 border-blue-500" : ""
          } hover:cursor-pointer`}
        >
          学部・学科
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "classes" && <Classes />}
        {activeTab === "majors" && <Majors />}
      </div>
    </div>
  );
}

export default App;
