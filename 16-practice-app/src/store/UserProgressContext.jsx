import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", // Cart, Checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserPorgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");

  function showCart() {
    setProgress("Cart");
  }

  function hideCart() {
    setProgress("");
  }

  function showCheckout() {
    setProgress("Checkout");
  }

  function hideCheckout() {
    setProgress("");
  }

  const context = {
    progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={context}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
