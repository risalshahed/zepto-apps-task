import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BooksProvider from './provider/BooksProvider';

function App() {
  return (
    <BooksProvider>
      <Navbar />
      <Home />
    </BooksProvider>
  )
}

export default App;