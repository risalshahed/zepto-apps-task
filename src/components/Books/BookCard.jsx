const BookCard = ({ book }) => {
  const { title, authors, formats, translators, download_count, subjects } = book;

  return (
    <div>
      <div>
        <img src={formats['image/jpeg']} alt={title} />
      </div>
      <h2>{title}</h2>
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
      {/* {
        subjects?.length > 0 && subjects.map((subject, index) =>
          <p key={index}>{subject}</p>
        )
      } */}
    </div>
  );
}

export default BookCard;