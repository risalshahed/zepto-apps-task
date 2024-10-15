import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

const useFetchBooks = (page) => {
  const [books, setBooks] = useContext(BooksContext);
  // const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // wishlist
  const [wishlist, setWishlist] = useState([]);
  // const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

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

  // *********** Wishlist related side effects ***********
  // Load wishlist from localStorage when the hook is initialized
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle Wishlist: Add/remove books from the wishlist
  const toggleWishlist = book => {
    if (wishlist.some(wishlistedBook => wishlistedBook.id === book.id)) {
      setWishlist(wishlist.filter((wishlistedBook) => wishlistedBook.id !== book.id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  const isBookWishlisted = bookId => {
    return wishlist.some(book => book.id === bookId);
  };

  return { books, isLoading, wishlist, toggleWishlist, isBookWishlisted };
};

export default useFetchBooks;