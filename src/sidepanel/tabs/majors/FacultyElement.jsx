const facultyColors = {
  text: {
    文学部: "text-red-600",
    教育人間科学部: "text-orange-600",
    経済学部: "text-amber-600",
    法学部: "text-fuchsia-600",
    経営学部: "text-yellow-600",
    総合文化政策学部: "text-lime-600",
    国際政治経済学部: "text-teal-600",
    理工学部: "text-green-600",
    社会情報学部: "text-sky-600",
    地球社会共生学部: "text-emerald-600",
    コミュニティ人間科学部: "text-yellow-600",
  },
  border: {
    文学部: "border-red-600",
    教育人間科学部: "border-orange-600",
    経済学部: "border-amber-600",
    法学部: "border-fuchsia-600",
    経営学部: "border-yellow-600",
    総合文化政策学部: "border-lime-600",
    国際政治経済学部: "border-teal-600",
    理工学部: "border-green-600",
    社会情報学部: "border-sky-600",
    地球社会共生学部: "border-emerald-600",
    コミュニティ人間科学部: "border-yellow-600",
  },
};

function FacultyElement({ faculty: facultyInput, isLast, selectedMajor, setSelectedMajor }) {
  const { faculty, majors } = facultyInput;

  function handleClick(major) {
    setSelectedMajor(major);
  }

  return (
    <>
      <li>
        <h3 className={`text-2xl mb-2 ${facultyColors.text[faculty]}`}>{faculty}</h3>
        <ul className="flex flex-col gap-2 text-orange-500">
          {majors.map((major, index) => {
            const isSelected = major.label === selectedMajor;
            const baseStyle = `cursor-pointer text-neutral-700 text-lg hover:underline border-l-2 pl-2 ml-2 ${facultyColors.border[faculty]}`;
            const selectedStyle = `text-lg ${facultyColors.text[faculty]} border-l-2 pl-2 ml-2 ${facultyColors.border[faculty]} flex gap-2`;

            return (
              <li
                className={isSelected ? selectedStyle : baseStyle}
                onClick={() => handleClick(major.label)}
                key={index}
              >
                <p
                  className={`transition-all duration-300 ${!isSelected && "hover:translate-x-1.5"} ${
                    isSelected && "font-semibold"
                  }`}
                >
                  {major.label}
                </p>
                {isSelected && <span className="text-stone-500">(選択済み)</span>}
              </li>
            );
          })}
        </ul>
      </li>

      {!isLast && <div className="w-auto h-0.5 bg-stone-200"></div>}
    </>
  );
}

export default FacultyElement;
