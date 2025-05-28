import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BookDetails = () => {
  const { id } = useParams()
  const { books } = useSelector(state => state.books)
  const book = books.find(b => b.id.toString() === id)

  const getBookCover = (category) => {
    const covers = {
      'Fiction': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'Non-Fiction': 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'Sci-Fi': 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'Mystery': 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'Biography': 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
    return covers[category] || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }

  if (!book) {
    return (
      <div className="container empty-state">
        <p className="empty-message">Book not found.</p>
        <Link to="/browse" className="btn btn-secondary">
          Back to browse
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="book-details-container">
        <div className="book-details-flex">
          <img 
            src={getBookCover(book.category)} 
            alt={book.title}
            className="book-details-cover"
          />
          <div className="book-details-content">
            <h1 className="book-details-title">{book.title}</h1>
            <p className="book-details-author">by {book.author}</p>
            
            <div className="book-details-meta">
              <div className="book-details-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(book.rating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
                <span>({book.rating})</span>
              </div>
              <span className="book-details-category">{book.category}</span>
            </div>
            
            <div className="book-details-description">
              <h2 className="description-title">Description</h2>
              <p>{book.description}</p>
            </div>
            
            <Link 
              to="/browse" 
              className="btn btn-secondary"
            >
              Back to Browse
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails