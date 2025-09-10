import { act, createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (x) => x.id === action.payload.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }
    return {...state, items: updatedItems};
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      items: items.filter((item) => item.id !== action.payload),
    };
  }
  return state;
}

export function ContextProvider({ children }) {
  const [cartState, cartDispatcher] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    cartDispatcher({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  const removeItem = (id) => {
    console.log();
  };

  return (
    <CartContext value={{ items: { cartState }, addItem, removeItem }}>
      {children}
    </CartContext>
  );
}

export default CartContext;
