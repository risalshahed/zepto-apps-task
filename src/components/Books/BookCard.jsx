import HeartIcon from "./HeartIcon";

const BookCard = ({ book, toggleWishlist, isBookWishlisted }) => {
  const { id, title, authors, formats, translators, download_count } = book;

  return (
    <div>
      <div>
        <img src={formats['image/jpeg']} alt={title} />
      </div>
      <HeartIcon
        isWishlisted={isBookWishlisted(id)}  // Check if book is in wishlist
        onClick={() => toggleWishlist(book)} // Toggle wishlist on click
      />
      <h2>
        {title}
      </h2>
      <p><strong>{download_count}</strong> times downloaded</p>
      <h4>
        Written by:
      </h4>
      {
        authors?.length > 0 && authors.map((author, index) =>
          <p key={index}>{author.name}</p>
        )
      }
      {
        translators?.length > 0 && (
          <>
            <h4>
              Translated by:
            </h4>
            {
              translators.map((translator, index) =>
                <p key={index}>{translator.name}</p>
              )
            }
          </>
        )
      }
    </div>
  );
}

export default BookCard;