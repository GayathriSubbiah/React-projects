import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  // Sample book cover images based on category
  const getBookCover = (category) => {
    const covers = {
      'Fiction': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'Non-Fiction': 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'Sci-Fi': 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'Mystery': 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'Biography': 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
    return covers[category] || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }

  return (
    <div className="book-card">
      <img 
        src={getBookCover(book.category)} 
        alt={book.title}
        className="book-cover"
      />
      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-meta">
          <span className="book-category">{book.category}</span>
          <span className="book-rating">★ {book.rating}</span>
        </div>
        <Link 
          to={`/book/${book.id}`}
          className="btn btn-primary"
          style={{ marginTop: '1rem', display: 'block' }}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default BookCard