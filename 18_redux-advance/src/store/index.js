import  uiSliceReducer from "./ui-slice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {ui: uiSliceReducer}
});

export default store;