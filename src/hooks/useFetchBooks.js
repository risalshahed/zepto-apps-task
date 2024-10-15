import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

const useFetchBooks = (page = 1) => {
  const [books, setBooks] = useContext(BooksContext);
  const [isLoading, setIsLoading] = useState(true);
  // wishlist
  // const [wishlist, setWishlist] = useState([]);
  const getInitialWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (error) {
      console.error("Error parsing wishlist from localStorage", error);
      return [];
    }
  };
  // wishlist
  const [wishlist, setWishlist] = useState(getInitialWishlist);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || ''
  );

  const [selectedSubject, setSelectedSubject] = useState(
    localStorage.getItem('selectedSubject') || ''
  );

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

  }, [page, setBooks]);

  // *********** Wishlist related side effects ***********
  // Load wishlist from localStorage when the hook is initialized
  // useEffect(() => {
  //   const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  //   setWishlist(savedWishlist);
  // }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle Wishlist
  // const toggleWishlist = book => {
  //   if (wishlist.some(wishlistedBook => wishlistedBook.id === book.id)) {
  //     setWishlist(wishlist.filter(wishlistedBook => wishlistedBook.id !== book.id));
  //   } else {
  //     setWishlist([...wishlist, book]);
  //   }
  // };

  const toggleWishlist = book => {
    const isWishlisted = wishlist.some(wishlistedBook => wishlistedBook.id === book.id);
    const updatedWishlist = isWishlisted 
      ? wishlist.filter(wishlistedBook => wishlistedBook.id !== book.id) 
      : [...wishlist, book];
    
    setWishlist(updatedWishlist);
  };

  const isBookWishlisted = bookId => wishlist.some(book => book.id === bookId);

  // Persist search query and subject selection in localStorage
  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('selectedSubject', selectedSubject);
  }, [searchQuery, selectedSubject]);

  // Filter books based on search query and subject selection
  const filteredBooks = books?.results?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject ? book.subjects.includes(selectedSubject) : true;
    return matchesSearch && matchesSubject;
  });

  return {
    books,
    // filteredBooks: searchQuery || selectedSubject ? filteredBooks : books?.results,
    filteredBooks,
    isLoading,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    toggleWishlist,
    isBookWishlisted
  };
};

export default useFetchBooks;