import { Link } from 'react-router-dom'

const CategoryList = ({ categories }) => {
  return (
    <div className="category-list">
      <h2 className="category-title">Browse Categories</h2>
      <div className="category-tags">
        {categories.map(category => (
          <Link
            key={category}
            to={`/browse/${category.toLowerCase()}`}
            className="category-tag"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList