import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BrowseBooks from './pages/BrowseBooks'
import BookDetails from './pages/BookDetails'
import AddBook from './pages/AddBook'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // Import the Footer

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseBooks />} />
              <Route path="/browse/:category" element={<BrowseBooks />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App