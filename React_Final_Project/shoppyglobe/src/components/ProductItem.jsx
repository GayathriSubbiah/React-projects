// ProductItem.jsx
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="product-image"
          />
          {product.discountPercentage && (
            <span className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </Link>
        <button className="wishlist-button">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div className="product-info">
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-rating">
            <div className="stars" style={{ '--rating': product.rating }}>
              ★★★★★
            </div>
            <span>({product.rating})</span>
          </div>
        </Link>
        
        <div className="product-pricing">
          <span className="current-price">
            ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}
          </span>
          {product.discountPercentage && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;