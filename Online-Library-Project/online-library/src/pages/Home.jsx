import { useSelector } from 'react-redux'
import BookCard from '../components/BookCard'
import CategoryList from '../components/CategoryList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const { books, categories } = useSelector(state => state.books)
  const popularBooks = books.slice(0, 4) // Show 4 popular books

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Welcome to Our Digital Library</h1>
        <p className="hero-subtitle">
          Discover, explore, and immerse yourself in our vast collection of books from around the world
        </p>
      </section>

      <CategoryList categories={categories} />

      <section>
        <h2 className="category-title">
          <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: '10px' }} />
          Popular Reads
        </h2>
        <div className="books-grid">
          {popularBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home