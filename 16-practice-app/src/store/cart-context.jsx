import { createContext, useReducer } from "react";

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
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (x) => x.id === action.payload
    );
    let existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      existingItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updatedItems[existingCartItemIndex] = existingItem;
    }

    return { ...state, items: updatedItems };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatcher] = useReducer(cartReducer, { items: [] });

  function addItem(item) {

    console.log(cartState);
    cartDispatcher({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  const removeItem = (id) => {
    cartDispatcher({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
