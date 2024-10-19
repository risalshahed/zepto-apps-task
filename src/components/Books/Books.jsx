import { useEffect, useMemo, useState } from 'react';
import useFetchBooks from '../../hooks/useFetchBooks';
import BookCard from './BookCard';
import SearchFilter from '../SearchFilter';
import Loading from '../Loading/Loading';

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
    removingBookId
  } = useFetchBooks(page);

  const [displayedBooks, setDisplayedBooks] = useState([]);

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  }

  const handleNext = () => {
    books.next && setPage(prev => prev + 1)
  }

  const handleLastPage = () => {
    const lastPage = Math.ceil(books.count / books.results.length);
    setPage(lastPage);
  }

  // Update displayedBooks if filterWishlist, filteredBooks, or books change
  useEffect(() => {
    if(filterWishlist) {
      setDisplayedBooks(wishlist);
    } else {
      setDisplayedBooks(filteredBooks?.length > 0 ? filteredBooks : []);
    }
  }, [filterWishlist, filteredBooks, books, wishlist]);

  // Extract unique subjects from "books" array
  const uniqueSubjects = useMemo(() => {
    return books?.results?.flatMap(book => book.subjects)
      .filter((value, index, self) => self.indexOf(value) === index) || [];
  }, [books]);

  if(isLoading) {
    return <Loading />
  }

  let whichPageNumber;
  switch (page % 10) {
    case 1:
      whichPageNumber = <sup>st</sup>
      break;
    case 2:
      whichPageNumber = <sup>nd</sup>
      break;
    case 3:
      whichPageNumber = <sup>rd</sup>  
      break;
    default:
      whichPageNumber = <sup>th</sup>
      break;
  }
  
  return (
    <div>
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
      
      <div className='books-view'>
        <h1>
          Collection of {filterWishlist && 'Your Favorite'} Books
        </h1>
        {
          filterWishlist && (
            <p className='count-wish'>
              You&apos;ve liked <strong>{wishlist.length}</strong> books
            </p>
          )
        }
        {/* Display Books */}
          <div className='all-books'>
            {
              displayedBooks?.map(book =>
                <div className={`${filterWishlist && `wishlist-item ${removingBookId === book.id && 'removing'}`}`} key={book.id}>
                  <BookCard
                    book={book}
                    toggleWishlist={toggleWishlist}
                    isBookWishlisted={isBookWishlisted}
                    filterWishlist={filterWishlist}
                  />
                </div>
              )
            }
          </div>

        {
          filterWishlist || (
            <>
              <div id='btn-parent-pagination'>
                <button onClick={() => setPage(1)}>
                  First Page
                </button>
                <h4>
                  &lt; &lt; &lt;
                </h4>
                <h4>
                  &lt; &lt; &lt;
                </h4>
                <h4>
                  &lt; &lt; &lt;
                </h4>
                <div id='btn-pagination'>
                  <button onClick={handlePrevious} disabled={page === 1}>
                    Previous
                  </button>
                  <button onClick={handleNext}>
                    Next
                  </button>
                </div>
                <h4>
                  &gt; &gt; &gt;
                </h4>
                <h4>
                  &gt; &gt; &gt;
                </h4>
                <h4>
                  &gt; &gt; &gt;
                </h4>
                <button onClick={handleLastPage}>
                  Last Page
                </button>
              </div>
              <h3 id='page-number'>
                {page}{whichPageNumber} page
              </h3>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Books;