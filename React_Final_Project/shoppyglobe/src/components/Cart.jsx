import { useSelector } from 'react-redux';
import CartItem from './CartItem';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className="cart">Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;