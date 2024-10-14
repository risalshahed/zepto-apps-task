import { useState } from 'react';
import useFetchBooks from '../../hooks/useFetchBooks';
import Loading from '../Loading';

const Books = () => {
  const [page, setPage] = useState(1);
  const { books, isLoading } = useFetchBooks(page);

  console.log(books?.results);

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  }

  const handleNext = () => {
    books.next && setPage(prev => prev + 1)
  }

  let content;

  if(isLoading) {
    content = <Loading />
  }

  if(!isLoading) {
    content = (
      books?.results?.map(book =>
        <p key={book.id}>{book.title}</p>
      )
    )
  }

  return (
    <>
      <h2>Page No: {page}</h2>
      <b>{books?.results?.length}</b>
      { content }
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
  );
}

export default Books;
