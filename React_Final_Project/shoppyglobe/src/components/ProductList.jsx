// ProductList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductItem from './ProductItem';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, loading, error } = useProducts('https://dummyjson.com/products');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h3>Error loading products</h3>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h1 className="page-title">Our Products</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="filters-container">
        <div className="category-filters">
          <button className="filter-button active">All</button>
          <button className="filter-button">Skincare</button>
          <button className="filter-button">Electronics</button>
          <button className="filter-button">Home</button>
        </div>
        <div className="sort-options">
          <select className="sort-select">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Customer Rating</option>
          </select>
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;