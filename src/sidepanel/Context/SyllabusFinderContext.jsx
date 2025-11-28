import { createContext, useState } from "react";

const SyllabusFinderContext = createContext(undefined);

export function SyllabusFinderProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [classes, setClasses] = useState({});
    const [selectedMajor, setSelectedMajor] = useState("");

    const value = {
        isLoading,
        setIsLoading,
        classes,
        setClasses,
        selectedMajor,
        setSelectedMajor,
    };

    return <SyllabusFinderContext.Provider value={value}>{children}</SyllabusFinderContext.Provider>;
}

export { SyllabusFinderContext };
export default SyllabusFinderProvider;
