import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/cart-context.jsx";
import { UserPorgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <CartContextProvider>
      <UserPorgressContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserPorgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
