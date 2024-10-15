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
      <main>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/wishlist' Component={WishList} />
        </Routes>
      </main>
    </BooksProvider>
  )
}

export default App;