const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);

const counterSubsriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubsriber);

store.dispatch({ type: "increment" });
