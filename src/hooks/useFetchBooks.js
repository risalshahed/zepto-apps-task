import { useState, useEffect } from 'react';

const useFetchBooks = (page) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async (pageNum) => {
      setLoading(true);

      // Check if the data for this page exists in localStorage
      const cachedData = localStorage.getItem(`books-page-${pageNum}`);

      if (cachedData) {
        // Use data from localStorage
        setBooks(JSON.parse(cachedData));
        setLoading(false);
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
          setLoading(false);
        }
      }
    };

    fetchBooks(page);

    // Optionally, you could pre-fetch the next and previous pages and store them in localStorage
    if (!localStorage.getItem(`books-page-${page + 1}`)) {
      fetchBooks(page + 1); // Pre-fetch next page
    }
    if (page > 1 && !localStorage.getItem(`books-page-${page - 1}`)) {
      fetchBooks(page - 1); // Pre-fetch previous page
    }

  }, [page]);

  return { books, loading };
};

export default useFetchBooks;