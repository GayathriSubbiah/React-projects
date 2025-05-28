import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BookCard from '../components/BookCard'
import SearchBar from '../components/Searchbar'

const BrowseBooks = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''
  const { books } = useSelector(state => state.books)

  const filteredBooks = books.filter(book => {
    const matchesCategory = !category || book.category.toLowerCase() === category.toLowerCase()
    const matchesSearch = !searchTerm || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container">
      <h1 className="page-title">
        {category ? `${category} Books` : 'All Books'}
      </h1>
      
      <SearchBar />
      
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-message">No books found.</p>
          <Link to="/browse" className="btn btn-secondary">
            Back to all books
          </Link>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BrowseBooks