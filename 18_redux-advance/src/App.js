import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const isCartVisible = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch("https://backend-14637-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
        ContentType: "application/json",
      });

      if(!response.ok) {
        throw new Error('Sending cart data failed');
      }

      const responseData = await response.json();
    };

    sendCartData();
  }, [cart]);
  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
