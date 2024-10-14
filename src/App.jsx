import { useState } from 'react';
import './App.css'
import UseFetchBooks from './hooks/useFetchBooks';
import Loading from './components/Loading';
// import Navbar from './components/Navbar'

function App() {
  const [page, setPage] = useState(1);
  const { books, loading } = UseFetchBooks(page);

  // console.log(books?.results);

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  }

  const handleNext = () => {
    books.next && setPage(prev => prev + 1)
  }

  return (
    <>
      {
        loading
        ?
        <Loading />
        :
        <>
          <h2>Page No: {page}</h2>
          <b>{books?.results?.length}</b>
          {
            books?.results?.map(book =>
              <p key={book.id}>{book.title}</p>
            )
          }
          <div id='btn-parent'>
            <button onClick={handlePrevious} disabled={page === 1}>
              Previous
            </button>
            <button onClick={handleNext}>
              Next
            </button>
          </div>

          {/* <h2>Page No: {page}</h2> */}

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

          {/* <h2>Page No: {page}</h2> */}

          {/* <Navbar /> */}
        </>
      }
    </>
  )
}

export default App;