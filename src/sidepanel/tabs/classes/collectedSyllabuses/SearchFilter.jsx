function SearchFilter({ classInfo }) {
  const { day, lectureName, lecturer, period, term } = classInfo;

  return (
    <div className="bg-blue-300/30 p-4">
      <h1 className="text-xl text-blue-600 font-semibold pb-1">{lectureName}</h1>
      <div className="flex flex-col gap-0.5">
        <p className="text-gray-600 text-sm">{lecturer}</p>
        <p className="text-gray-600 text-sm">
          {day}・{period}・{term}
        </p>
      </div>
    </div>
  );
}

export default SearchFilter;
