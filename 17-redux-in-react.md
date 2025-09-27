## Redux in React

1. Install redux and react-redux

```
npm install redux react-redux

```

2. Set up the store
   - Create a package name store (optional but good practice)
   - Create an index.js class that contains the store

```
import {createStore} from "redux";

const counterReducer = (state = {counter: 0}, action) => {
  if(action.type === 'increment') {
    //...
  }
  return state;
};

const store = createStore(counterReducer);


export default store;

```

3. Now we have to provide the store to a component
   - So that the store will be available to that component and to all of its children
   - Usually that component is the App component.
   - First we import `Provider` from `react-redux`.
   - Wrap that around the `App` component
   - Then we pass the `store` to that `Provider` element

```
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store/index";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

```

4. Accessing state of the store in a component
   - First we have to import a hook named `useSelector` from `react-redux`
   - It will help in getting the specific keys from the state of the store.
   - And it also subscribes to the store, so that we can get the latest value of the state.

```
import { useSelector } from "react-redux";

import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter);

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

```

5. Dispatching action
   - We have to use `useDispatch` hook from `react-redux`.
   - Executing the `useDispatcher` function will give a function that we can name anything.
   - Using that function we can send any action to the reducer function of the store.

```
import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);


  const incrementHandler = () => {
    dispatch({ type: 'increment'});
  };

  const decrementHandler = () => {
    dispatch({type: 'decrement'});
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

```

6. Redux in class based component
   - we don't have hooks in class based component
   - So we can use `connect` to connect the class based component
   - While exporting the component we can use connect like `connect()(<Component-Name>)`
   - First connect gets executed that returns a function and then to that function we pass class based component as a parameter
   - we also need to pass 2 functions to connect function
     - first one is to map the state to the props of the component
     - Second one is tp map the dispatcher functions to the props of the component

```
const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};
```

7. Class based component complete example

```
import { connect } from "react-redux";

import classes from "./Counter.module.css";
import { Component } from "react";

class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);


```

8. Challenges of Redux
   - Action types, in bigger applications we will have lots of action types to manage
   - Lots of state properties to manage at a same place

9. Redux toolkit
   - Install using `npm install @reduxjs/toolkit`
   - Then we can even uninstall the redux, as redux is already included in the redux toolkit.
   - Redux toolkit provides method which helps in removing boilerplate code
   - We can work with segments of state in different files, no need to keep the whole state at one place

10. `createSlice`
    - Method provided by toolkit to work with a slice of the state
    - We can have 2 different state like authentication state and counter state
    - We can manage them separately in 2 different files using `createSlice`
    - It takes an object with properties like name, initial state and the reducer to calculate the state value
    - Here we can change the state directly, no need to mutate the object


```
import { createSlice } from "@reduxjs/toolkit";

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
```

11. Registering reducer in store
    - Like in simple redux we have to create a store and pass the reducer to it.
    - Here also we have to create a store but here we can use `configureStore` to create a store
    - In the simple redux we have only 1 reducer so we can directly pass it to the `createStore`
    - Here we can have multiple reducer 1 per slice, so have to pass an object in `reducer` key and value is the reducer of the slice method (in our example we have `counterSlice`)

```
const store = configureStore({
  reducer: {counter: counterSlice.reducer}
});

export default store;
```