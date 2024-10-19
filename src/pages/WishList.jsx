import Books from "../components/Books/Books";
import useFetchBooks from '../hooks/useFetchBooks'; // Import the custom hook

const Wishlist = () => {
  const { wishlist } = useFetchBooks(); // Get the wishlist from the hook

  // console.log('In wishlist page', wishlist);

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