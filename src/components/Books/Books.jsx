import { useEffect, useMemo, useState } from 'react';
import useFetchBooks from '../../hooks/useFetchBooks';
import Loading from '../Loading';
import BookCard from './BookCard';
import SearchFilter from '../SearchFilter';

const Books = ({ filterWishlist = false }) => {
  const [page, setPage] = useState(1);
  const {
    books,
    filteredBooks,
    isLoading,
    wishlist,
    toggleWishlist,
    isBookWishlisted,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
  } = useFetchBooks(page);

  const [displayedBooks, setDisplayedBooks] = useState([]);

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  }

  const handleNext = () => {
    books.next && setPage(prev => prev + 1)
  }

  // Conditionally render books based on filterWishlist prop
  /* const displayedBooks = filterWishlist ? wishlist : filteredBooks || books?.results;

  console.log('displayedBooks', displayedBooks);

  // console.log('In Books Component', displayedBooks);

  const uniqueSubjects = books?.results?.flatMap(
    book => book.subjects
  )
  .filter(
    (value, index, self) => self.indexOf(value) === index
  ) */

  // Update displayedBooks whenever filterWishlist, filteredBooks, or books change
  useEffect(() => {
    if (filterWishlist) {
      setDisplayedBooks(wishlist);
    } else {
      setDisplayedBooks(filteredBooks?.length > 0 ? filteredBooks :  []);
    }
  }, [filterWishlist, filteredBooks, books, wishlist]);

  // Extract unique subjects from the books array using useMemo for performance optimization
  const uniqueSubjects = useMemo(() => {
    return books?.results?.flatMap(book => book.subjects)
      .filter((value, index, self) => self.indexOf(value) === index) || [];
  }, [books]);

  if(isLoading) {
    return <Loading />
  }
  
  return (
    <>
      { filterWishlist || <h2>Page No: {page}</h2> }

      { filterWishlist || <b>{displayedBooks?.length}</b> }

      {/* Render SearchFilter component if not on Wishlist page */}
      {filterWishlist || (
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          uniqueSubjects={uniqueSubjects}
        />
      )}
      
      {/* Display Books */}
      <div className='all-books'>
        {
          displayedBooks?.map(book =>
            <BookCard
              key={book.id}
              book={book}
              toggleWishlist={toggleWishlist}
              isBookWishlisted={isBookWishlisted}
            />
          )
        }
      </div>

      {
        filterWishlist || (
          <>
            <div id='btn-parent'>
              <button onClick={handlePrevious} disabled={page === 1}>
                Previous
              </button>
              <button onClick={handleNext}>
                Next
              </button>
            </div>

            <div id='btn-parent'>
              <button onClick={() => setPage(1)}>
                First Page
              </button>
              <button onClick={() => setPage(
                Math.ceil(books.count / books.results.length)
              )}>
                Last Page
              </button>
            </div>
            <h2>Page No: {page}</h2>
          </>
        )
      }

    </>
  );
}

export default Books;