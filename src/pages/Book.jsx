import { useEffect } from "react";
import BookDetails from "../components/BookDetails";

const Book = () => {
  useEffect(() => {
    document.title = 'Zepto Apps Task | Book Details';
  }, []);

  return (
    <BookDetails />
  );
}

export default Book;