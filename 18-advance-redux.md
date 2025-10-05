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
