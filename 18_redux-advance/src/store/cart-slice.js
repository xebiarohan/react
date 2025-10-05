const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart: (state, action) => {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart: (state, action) => {
      console.log(action.payload);
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.totalPrice - item.price;
      } else {
        state.items = state.items.filter((item) => item.id !== itemId);
      }
      state.totalQuantity--;
      state.totalPrice = item.totalPrice - item.price;
    },
  },
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
