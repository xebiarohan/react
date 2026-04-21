import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items: ["first"],
  },
  reducers: {
    addItem(state, action) {
      return {
        items: [...state.items, action.payload],
      };
    },
    removeItem(state, action) {
      return {
        items: state.items.filter((item) => item === action.payload),
      };
    },
    removeAll() {
      return {
        items: [],
      };
    },
    printMessage(state, action) {
      console.log("Method called with :" + action.payload);
    },
  },
});

export function fetchItem() {
  return async (dispatch) => {
    dispatch(CartActions.printMessage('first message'));

    setTimeout(() => {
      dispatch({ type: "cartSlice/addItem", payload: "thunk item" });
      dispatch({ type: "cartSlice/printMessage", payload: "second message" });
    }, 3000);
  };
}

export const CartActions = CartSlice.actions;
export default CartSlice.reducer;
