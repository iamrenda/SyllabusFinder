function SearchFilter({ searchFilter }) {
  const { day, isOnline, lectureName, lecturer, major, period, term } = searchFilter ?? {};

  return (
    <div>
      <p>科目名: {lectureName}</p>
      <p>担当教員: {lecturer}</p>
      <p>学科: {major}</p>
      <p>曜日: {day}</p>
      <p>期間: {term}</p>
      <p>形式: {isOnline ? "オンライン" : period}</p>
    </div>
  );
}

export default SearchFilter;
