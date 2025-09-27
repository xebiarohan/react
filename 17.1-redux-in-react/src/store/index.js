import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import ACTIONS from "./ActionTypes";

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter --;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    decrease(state, action) {
      state -= action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: {counter: counterSlice.reducer}
});

export default store;
