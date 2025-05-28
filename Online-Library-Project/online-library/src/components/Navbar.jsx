import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">Online Library</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse" className="nav-link">Browse Books</Link>
          <Link to="/add-book" className="nav-link">Add Book</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar