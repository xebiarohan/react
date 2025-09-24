# Redux

1. A state management system for cross component and app-wide state
   - Data that when changed, should affect the UI
   - Local state: when state is specific to a single component
   - Cross component: when state is common between multiple components
   - App wide: When state is common between all the components of the application example user authentication

2. Redux vs React context.
   - React context has potential disadvantages
     - Setup can be complex
     - Performance

3. Core Redux concept
   - Maintains one central data store (state)
   - Components subscribes to the store, when data changes, components gets notified.
   - Components NEVER updates the state in the store
   - Reducer function is used to update the state in the store
   - Components triggers some actions.
   - Actions are forwarded to the reducer function by Redux

4. A reducer function is a pure function that takes 2 arguments
    - old state
    - Dispatched action
  - And it outputs the new state.
  - It is called by the redux library when ever a component triggers an action

5. Example
   - Here we have a store which takes a reducer function.
   - Then we subscribe to the store using `store.subscribe` and pass a function to it
   - this `counterSubscriber` function will get called when the reducer function changes the state of the store.
   - Then we can dispatch an action using the `store.dispatch` function, that will be passed to the reducer function by redux as second argument.

```
   const redux = require("redux");

   const counterReducer = (state = { counter: 0 }, action) => {
   return {
      counter: state.counter + 1,
   };
   };

   const store = redux.createStore(counterReducer);

   const counterSubsriber = () => {
   const latestState = store.getState();
   console.log(latestState);
   };

   store.subscribe(counterSubsriber);


   store.dispatch({type: 'increment'});


```

6. 