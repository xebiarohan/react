import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/cart-context.jsx";

export default function Header() {
  const cartContext = useContext(CartContext);

  const totalCartItems = cartContext.items.reduce(
    (total, item) => { return total + item.quantity},
    0
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
