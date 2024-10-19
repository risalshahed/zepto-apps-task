import { useParams } from "react-router-dom";
import useFetchSingleBook from "../hooks/useFetchSingleBook";
import Loading from "./Loading/Loading";

const BookDetails = () => {
  const { id } = useParams();
  const { book, isLoading } = useFetchSingleBook(id);

  if(isLoading) {
    return <Loading />
  }

  return (
    <>
      {
        book
        ?
        <div className='books-view each-book'>
          <h1>{book.title}</h1>
          <div>
            <img src={book.formats['image/jpeg']} alt={book.title} />
          </div>
          <p>Book&apos;s Id: <strong>{book.id}</strong></p>
          <h2>Title: {book.title}</h2>
          {
            book.authors?.length > 0 && book.authors.map((author, index) =>
              <div key={index}>
                <p>
                  Written By: <span id='each-book-author'>{author.name}</span> (From <strong>{author.birth_year}</strong> to <strong>{author.death_year})</strong>
                </p>
              </div>
            )
          }
          <p><strong>{book.download_count}</strong> times downloaded</p>
          <div id='each-book-subjects'>
            <h3>Subjects</h3>
            <table >
            {
              book.subjects?.length > 0 && book.subjects.map((subject, index) =>
                <tr key={index}>
                  <td>
                    {subject}
                  </td>
                </tr>
              )
            }
            </table>
          </div>
        </div>
        :
        <p>Book Not Found</p>
      }
    </>
  );
}

export default BookDetails;