import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div className="item-details">
        <h3>{item.title}</h3>
        <p>${item.price}</p>
        <div className="quantity-control">
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <button onClick={handleRemove}>Remove</button>
        </div>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartItem;