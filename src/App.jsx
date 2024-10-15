import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BooksProvider from './provider/BooksProvider';
import WishList from './pages/WishList';

function App() {
  return (
    <BooksProvider>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/wishlist' Component={WishList} />
      </Routes>
    </BooksProvider>
  )
}

export default App;