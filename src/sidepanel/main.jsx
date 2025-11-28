import App from "./App.jsx";
import SyllabusFinderProvider from "./Context/SyllabusFinderContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <SyllabusFinderProvider>
        <App />
    </SyllabusFinderProvider>
);
