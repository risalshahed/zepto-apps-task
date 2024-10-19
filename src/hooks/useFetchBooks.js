import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

const useFetchBooks = (page = 1) => {
  const [books, setBooks] = useContext(BooksContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingBookId, setRemovingBookId] = useState(null);
  
  const getInitialWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (error) {
      console.error("Error parsing wishlist from localStorage", error);
      return [];
    }
  };
  
  const [wishlist, setWishlist] = useState(getInitialWishlist);

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || ''
  );
  
  // filtered books' state
  const [selectedSubject, setSelectedSubject] = useState(
    localStorage.getItem('selectedSubject') || ''
  );

  useEffect(() => {
    const fetchBooks = async (pageNum) => {
      setIsLoading(true);

      // Check if the data for this page exists in local storage
      const cachedData = localStorage.getItem(`books-page-${pageNum}`);

      if (cachedData) {
        setBooks(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        try {
          const response = await fetch(`https://gutendex.com/books?page=${pageNum}`);
          const data = await response.json();
          
          // Save data
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

    // Update filtered books
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('selectedSubject', selectedSubject);

    // Step 1: Filter books based on searchQuery (title only)
    const initialFiltered = books?.results?.filter(book => {
      return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Step 2: Filter the initial results based on selectedSubject
    const filtered = initialFiltered?.filter(book => {
      return selectedSubject 
        ? book.subjects.some(subject => subject.toLowerCase().includes(selectedSubject.toLowerCase()))
        : true; // If no subject is selected, return all initial filtered books
    });

    setFilteredBooks(filtered);

  }, [page, setBooks]);

  // Update filtered books based on searchQuery and selectedSubject
  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('selectedSubject', selectedSubject);

    // Step 1: Filter books based on searchQuery (title only)
    const initialFiltered = books?.results?.filter(book => {
      return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Step 2: Filter the initial results based on selectedSubject
    const filtered = initialFiltered?.filter(book => {
      return selectedSubject 
        ? book.subjects.some(subject => subject.toLowerCase().includes(selectedSubject.toLowerCase()))
        : true; // If no subject is selected, return all initial filtered books
    });

    setFilteredBooks(filtered);

  }, [searchQuery, selectedSubject, books]);

  const toggleWishlist = book => {
    const isWishlisted = wishlist.some(wishlistedBook => wishlistedBook.id === book.id);
    if(isWishlisted) {
      setRemovingBookId(book.id);

      setTimeout(() => {
        const updatedWishlist = wishlist.filter(wishlistedBook => wishlistedBook.id !== book.id);
        setWishlist(updatedWishlist);
      }, 500);
    } else {
      const updatedWishlist = [...wishlist, book];
      setWishlist(updatedWishlist);
    }
  }

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isBookWishlisted = bookId => wishlist.some(book => book.id === bookId);

  return {
    books,
    filteredBooks,
    isLoading,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    toggleWishlist,
    isBookWishlisted,
    removingBookId
  };
};

export default useFetchBooks;