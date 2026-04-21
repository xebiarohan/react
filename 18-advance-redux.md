## Advance redux

Firebase: https://console.firebase.google.com/u/0/project/backend-14637/database/backend-14637-default-rtdb/data

1. Async code handling
   - Reducer function must be a pure function, side effect free and synchronous.
   - As we cannot handle async code in a reducer function, there are 2 ways we can handle them
     - Using the `useEffect` hook in the component where we are going to call `dispatch` function
     - Inside the `action creators` (new concept)

2. Where to keep the login
   - Possible places are : reducers, actions or components
   - In case the code is synchronous then reducers are better
   - In case the code is asynchronous or having side effects then action creators or components are better

3. `useEffect` scenario
   - Let say we are using redux to store some data,
   - First we can dispatch the action to update the state of the store (adding, removing)
   - Then we can subscribe to the store state, and if the store state is changed we can send the request to the backend with the updated data.
   - This way we can maintain the latest state in local redux as well as in backend.

```

useEffect(() => {
   const storeCartData = async () => {
      const respose  = await fetch('', {
         'method': 'PUT',
         'body': cart,
         'ContentType': 'application/json'
      });

      if(!response.ok) {
         throw new Error('Failed to store cart data');
      }
   }

   storeCartData().catch(error => {
      console.log('Error');      // Importatnt concept: adding catch to a async method call
   })

}, [cart]);

```

4. Action creators
   - An **action creator** is a function that returns an action object.
   - We can create an action creator in the slice class and export it
   - `type` in the return object must point to a function in reducers in one of slice
   - type is equal to '`slice-name`/`reducer-function`' name
   - then we can dispatch the action like

```js
function addItem(item) {
  return {
    type: "cart/addItem",
    payload: item,
  };
}
```

```js
createSlice({
  name: "cart",
  reducers: {
    addItem(state, action) {},
    removeItem(state, action) {},
  },
});
```

```js
dispatch(addItem("toys"));
```

1. Async action creators
   - A function that performs async work (API call, timeout, etc.) and then dispatches an action
   - here `fetchCartItems()` is a function that does some async work and then dispatches the action

```js
// Instead of
dispatch(addItem("item"));

// we do
dispatch(fetchCartItems());
```

6. Thunk
   - A function that returns another function (with logic inside)
   - A thunk action creator returns a function that performs async work and dispatches normal actions.
   - Inner function gets dispatch and state values
   - Thunk works as a middleware, as redux only accepts the object, but Thunk allows dispatching functions

```js
function myThunk() {
  return function (dispatch, getState) {
    // async or sync logic here
  };
}
```

7. Flow of a Thunk
   - From the component we can dispatch a thunk function (fetchData in the below example)
   - As redux only wants an object, So thunk comes into picture, and handles this request
   - when we dispatch a function from a component, thunk handles its internal function and passes dispatch and state to it and calls that internal function
   - Then internal function dispatches the objects to redux.

```js
dispatch(fetchData());
```

```js
export function fetchData() {
  return async function (dispatch, getState) {
    // 1. optional: dispatch loading action
    dispatch({ type: "data/loading" });

    try {
      // 2. async work (API call)
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();

      // 3. dispatch success action
      dispatch({
        type: "data/success",
        payload: data,
      });
    } catch (error) {
      // 4. dispatch error action
      dispatch({
        type: "data/error",
        payload: error.message,
      });
    }
  };
}
```

8. `createAsyncThunk`
   - handles async logic AND automatically dispatches lifecycle actions.
   - Lifecycle actions like pending, fulfilled, rejected.

9. Basic Syntax
   - method takes 2 argument type and `payloadCreator`
   - type is the name of the async thunk
   - payload creator is the function that will call the async code.

```js
createAsyncThunk(type, payloadCreator);

// type value
("cart/fetchItems");

// This generates
cart / fetchItems / pending;
cart / fetchItems / fulfilled;
cart / fetchItems / rejected;
```

10. `payloadCreator`
    - async function that has 2 arguments
    - first one is the argument that we want to pass
    - Second is `thunkAPI` it has dispatch, getState, rejectWithValue, requestId, signal.

```js
// payloadCreator
async (arg, thunkAPI) => {
  // API call
};
```

11. Real example
    - On calling it will dispatch 3 actions

```js
export const fetchItems = createAsyncThunk(
  "cart/fetchItems",
  async (_, thunkAPI) => {
    const response = await fetch("https://api.example.com/items");
    const data = await response.json();
    return data;
  },
);

// actions this function dispatches
fetchItems.pending;
fetchItems.fulfilled;
fetchItems.rejected;
```

12. Calling thunk function
    - Calling remains same

```js
dispatch(fetchItems());
```

13. Handing dispatched actions
    - We cannot add these dispatch actions in the reducers
    - We have to add them in the `extraReducers` of a slice

```js
extraReducers: (builder) => {
  builder
    .addCase(fetchItems.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
```

14. Error handing
    - Use the `rejectWithValue` of `ThunkAPI`
    - It will populate the payload value of an action
    - So that we can pass it to the `fetchItems.rejected` action creator

```js
const fetchItems = createAsyncThunk(
  "cart/fetchItems",
  async (_, thunkAPI) => {
     try {
      const response = await fetch("/api");  // fails

      if(!response.ok) {
        thunkAPI.rejectWithValue('Invalid response');
      }

      return await response.json();
     } catch(error) {
        thunkAPI.rejectWithValue(error.message);
     }
  },
);


// handling error in extraReducers

extraReducers: (builder) => {
  builder
  .addCase('fetchItems.rejected', (state, action) => {
    state.error = action.payload
  })
}
```
