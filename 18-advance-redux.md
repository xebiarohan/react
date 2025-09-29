## Advance redux 

1. Async code handling
   - Reducer function must be a pure function, side effect free and synchronous.
   - As we cannot handle async code in a reducer function, there are 2 ways we can handle them
     - Using the `useEffect` hook in the component where we are going to call `dispatch` function
     - Inside the `action creators` (new concept)

2. 