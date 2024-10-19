import Books from "../components/Books/Books";
import useFetchBooks from '../hooks/useFetchBooks';

const Wishlist = () => {
  const { wishlist } = useFetchBooks();

  return (
    <>
      {wishlist.length > 0 ? (
        <Books filterWishlist={true} />
      ) : (
        <p>No books in your wishlist yet.</p>
      )}
    </>
  );
};

export default Wishlist;