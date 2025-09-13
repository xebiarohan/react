import { createContext, useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/cart-context.jsx";
import { currencyFormatter } from "../util/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressContext.hideCart();
  }

  function handleOpenCheckout() {
    userProgressContext.showCheckout();
  }

  function handleCartItemIncrease(item) {
    cartContext.addItem(item);
  }

  function handleCartItemDecrease(id) {
    cartContext.removeItem(id);
  }

  return (
    <Modal className="cart" open={userProgressContext.progress === "Cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => handleCartItemIncrease(item)}
            onDecrease={() => handleCartItemDecrease(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
