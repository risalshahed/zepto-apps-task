const HeartIcon = ({ isWishlisted, onClick }) => {
  return (
    <p onClick={onClick} id='wish-icon'>
      {isWishlisted ? '❤️' : '🤍'}
    </p>
  );
}

export default HeartIcon;