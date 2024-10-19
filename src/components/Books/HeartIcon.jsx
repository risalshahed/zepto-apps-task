const HeartIcon = ({ isWishlisted, onClick }) => {
  return (
    <p
      onClick={onClick} id='wish-icon'
      title={`${isWishlisted ? 'Remove from' : 'Mark as'} wishlist`}
    >
      {isWishlisted ? '❤️' : '🤍'}
    </p>
  );
}

export default HeartIcon;