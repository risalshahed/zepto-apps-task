import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const BookCard = ({ book, toggleWishlist, isBookWishlisted }) => {
  const { id, title, authors, formats, download_count } = book;

  return (
    <>
      <div className='book-cover'>
        <img src={formats['image/jpeg']} alt={title} />
      </div>
      <HeartIcon
        isWishlisted={isBookWishlisted(id)}
        onClick={() => toggleWishlist(book)}
      />
      <h2>
        {title}
      </h2>
      <p><strong>{download_count}</strong> times downloaded</p>
      <div>
        Written by:
        {
          authors?.length > 0 && authors.map((author, index) =>
            <h3 key={index}>
              {author.name}
            </h3>
          )
        }
      </div>
      <Link to={`/books/${id}`}>
        <button>
          See Book
        </button>
      </Link>
    </>
  );
}

export default BookCard;