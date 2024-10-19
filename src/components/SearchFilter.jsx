const SearchFilter = ({ searchQuery, setSearchQuery, selectedSubject, uniqueSubjects, setSelectedSubject }) => {

  return (
    <div className='search-filter'>
      <input
        type="text"
        className="search-input"
        placeholder="Search by title"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {/* Genere Categories */}
      <select
        className='select-dropdown'
        value={selectedSubject}
        onChange={e => setSelectedSubject(e.target.value)}
      >
        <option value="">All Subjects</option>
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