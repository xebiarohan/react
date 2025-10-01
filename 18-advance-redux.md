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

4. 