import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../redux/bookSlice'

const AddBook = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories } = useSelector(state => state.books)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: categories[0] || '',
    description: '',
    rating: 3
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.author.trim()) newErrors.author = 'Author is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    const newBook = {
      ...formData,
      id: Date.now()
    }
    
    dispatch(addBook(newBook))
    navigate('/browse')
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Add a New Book</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`form-input ${errors.author ? 'error' : ''}`}
            />
            {errors.author && <p className="error-message">{errors.author}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`form-input ${errors.description ? 'error' : ''}`}
            ></textarea>
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="rating">Rating (0-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className={`form-input ${errors.rating ? 'error' : ''}`}
            />
            {errors.rating && <p className="error-message">{errors.rating}</p>}
          </div>
          
          <button
            type="submit"
            className="btn btn-primary form-submit"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBook