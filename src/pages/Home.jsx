import { useEffect } from "react";
import Books from "../components/Books/Books";

const Home = () => {
  useEffect(() => {
    document.title = 'Zepto Apps Task';
  }, [])

  return (
    <div>
      <Books />
    </div>
  );
}

export default Home;