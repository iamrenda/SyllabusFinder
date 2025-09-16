import React from "react";
import { createRoot } from "react-dom/client";

function SyllabusResults({ syllabusResults, onClose }) {
  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "white",
        border: "1px solid black",
        padding: "10px",
        zIndex: 9999,
      },
    },
    [
      React.createElement("h3", { key: "title" }, "Select a Syllabus"),
      ...syllabusResults.map((item, i) =>
        React.createElement(
          "button",
          { key: i, onClick: () => window.open(item.link, "_blank") },
          `${item.lectureName} - ${item.lecturer}`
        )
      ),
      React.createElement("button", { key: "close", onClick: onClose }, "Close"),
    ]
  );
}

function showSyllabusResults(syllabusResults) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  const handleClose = () => {
    root.unmount();
    container.remove();
  };

  root.render(
    React.createElement(SyllabusResults, {
      syllabusResults,
      onClose: handleClose,
    })
  );
}

export default showSyllabusResults;
