import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/browse?search=${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary search-button"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar