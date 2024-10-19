const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      © {year} Zepto | All Rights Reserved
    </footer>
  );
}

export default Footer;
