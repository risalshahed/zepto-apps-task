import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

const useFetchBooks = (page) => {
  const [books, setBooks] = useContext(BooksContext);
  // const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log('In Hook', books);

  useEffect(() => {
    const fetchBooks = async (pageNum) => {
      setIsLoading(true);

      // Check if the data for this page exists in localStorage
      const cachedData = localStorage.getItem(`books-page-${pageNum}`);

      if (cachedData) {
        // Use data from localStorage
        setBooks(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        try {
          const response = await fetch(`https://gutendex.com/books?page=${pageNum}`);
          const data = await response.json();
          
          // Save data to state and localStorage
          setBooks(data);
          localStorage.setItem(`books-page-${pageNum}`, JSON.stringify(data));
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBooks(page);

    // pre-fetch the next and previous pages and store them in localStorage
    if (!localStorage.getItem(`books-page-${page + 1}`)) {
      fetchBooks(page + 1); // Pre-fetch next page
    }
    if (page > 1 && !localStorage.getItem(`books-page-${page - 1}`)) {
      fetchBooks(page - 1); // Pre-fetch previous page
    }

  }, [page]);

  return { books, isLoading };
};

export default useFetchBooks;