import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {actions as counterActions} from './store/counterSlice.js';

function App() {
  const counter = useSelector((state) => state.counter.counter);
  const dispatcher = useDispatch();

  function handleIncrement() {
    dispatcher(counterActions.incrementValue());
  }

    function handleDecrement() {
    dispatcher(counterActions.decrementValue());
  }

  return (
    <>
      <p>Counter value is {counter}</p>
      <button onClick={handleIncrement}>Increase</button>
      <button onClick={handleDecrement}>Decrease</button>
    </>
  );
}

export default App;
