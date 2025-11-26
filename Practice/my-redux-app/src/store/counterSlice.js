import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        counter: 0
    },
    reducers: {
        incrementValue(state) {
            state.counter++;
        },
        decrementValue(state) {
            state.counter--;
        }
    }
});

const counterReducer = counterSlice.reducer;
export default counterReducer;

export const actions = counterSlice.actions;