const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    showCart: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggle: (state,action) => {
            state.showCart = !state.showCart;
        },
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;