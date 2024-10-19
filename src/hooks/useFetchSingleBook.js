import { useEffect, useState } from "react";

const useFetchSingleBook = id => {
  const [book, setBook] = useState(() => {
    const savedBook = localStorage.getItem(`book-${id}`);
    return savedBook ? JSON.parse(savedBook) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();
        setBook(data);
        localStorage.setItem(`book-${id}`, JSON.stringify(data));
      }
      catch(error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if(id) {
      fetchBook();
    }
  }, [id, book, setIsLoading]);

  return {
    book,
    isLoading
  }
}

export default useFetchSingleBook;