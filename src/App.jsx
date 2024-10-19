import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BooksProvider from './provider/BooksProvider';
import WishList from './pages/WishList';
import Book from './pages/Book';
import Footer from './components/Footer';

function App() {
  return (
    <BooksProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/wishlist' Component={WishList} />
          <Route path='/books/:id' Component={Book} />
        </Routes>
      </main>
      <Footer />
    </BooksProvider>
  )
}

export default App;