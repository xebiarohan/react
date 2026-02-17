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

4. `action creators`
   - Thunk
     - A function that delays an action until later (until something else gets completed)
     - Action creator is a thunk that returns a function, that function eventually returns an action
     - we create a function inside a function, internal function contains all the logic including the side effect.

```In the cart-actions.js

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://backend-14637-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          ContentType: "application/json",
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};


```

```in app.js
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

```


5. Action creators are just functions that returns some action

6. Action can be sync or async

7. In case the actions are sync then it can directly returns the action object like

```
    const dispatcher = useDispatcher();

    export const abc = (value) => {
        return  {
            type: 'ADD',
            payload: value
        }
    }

    handleAdd(value) {
        dispatcher(abc(value));
    }


```

8. In case of async we use Thunk where instead of returning the object itself we returns an async function that will dispatches the action

```

export const abc = (value) => {
    return async (dispatcher) => {
        dispatcher({
            type: 'ADD',
            payload: value
        })
    }
}


in a component

const dispatcher = useDispatcher();

useEffect(() => {
    dispatcher(abc(value));
}, dispatcher)

```

9. Other way to create an async action creator

```
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('/users');
  return res.json();
});
```

10. If we are using createAsyncThunk then we have to use `extraReducers` instead of `reducers` in a slice

```
extraReducers : (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
}

```

11. we can create an action creator in the slice class and export it
