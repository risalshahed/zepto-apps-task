import useFetchBooks from "../hooks/useFetchBooks";

const SearchFilter = () => {
  const { searchQuery, setSearchQuery, selectedSubject, setSelectedSubject, books } = useFetchBooks();

  // Get unique subjects from the books
  const uniqueSubjects = [...new Set(books?.results?.flatMap(book => book.subjects))];

  return (
    <div className='search-filter'>
      {/* Search bar for filtering by title */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by title"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Dropdown for filtering by subjects */}
      <select
        className="select-dropdown"
        value={selectedSubject}
        onChange={e => setSelectedSubject(e.target.value)}
      >
        <option value="">All Subjects</option>
        {/* Dynamically render subject options */}
        {
          uniqueSubjects?.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default SearchFilter;