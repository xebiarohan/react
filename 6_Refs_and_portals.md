1. Refs introduction
   - Used to get the reference of DOM elements
   - Need to import `useRef` from React
   - First have to create a variable using the useRef() method.
   - Add the ref prop to the element to which we want to map (ref ={playerName})
   - Then the ref variable (`playerName` in this example) will have access to all the properties of that element
   - While accessing the value we have to use `variableName.current.propertyName` to access the properties

```
import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState('');

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```

2. Refs are not for manipulating the DOM elements, it is usually used for reading element values.

3. Difference between Refs and state

   - In the first render cycle we don't have the ref connection to element
   - When Refs change the component function does not re-render
   - Refs connects element to value from the second render cycle.
   - State should be used for the values that is directly renders on the UI

4. Refs for internal variable management
   - Refs can be used for local variable management
   - Ref value will not reinitialize when a component re-renders (like on update of state value)

```
  let timer = useRef();

  function handleStart() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop(){
    clearTimeout(timer.current);
  }

```

5. Forwarding ref to custom component
   - Example
   - we have a component where we have to open a dialog box on some action
   - Dialogue box is in different component
   - we need to attach a ref to the dialog box, so that on some action in the parent component we can open it.
   - Before React 19 we have to use `forwardRef` to handle the ref from parent component

```parent component
let dialog = useRef();

function handleStart() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
}

return (
    <>
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
      <section className="challenge">
      ...
      </section>
    </>
);
```

``` dialog component
export default function ResultModal({ref, result, targetTime}) {
  return (
    <dialog className="result-modal" ref={ref}>
      <h2>You {result}</h2>
      <p>The target time was <strong>{targetTime} seconds</strong></p>
      <p>You stop the timer with <strong>X seconds left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

```

```before React 19

import { forwardRef } from "react";


const ResultModal =  forwardRef(function ResultModal({result, targetTime}, ref) {
  return (
    <dialog className="result-modal" ref={ref}>
      <h2>You {result}</h2>
      <p>The target time was <strong>{targetTime} seconds</strong></p>
      <p>You stop the timer with <strong>X seconds left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;

```

6. `UseImperativeHandle` hook
   - In the previous example we set the ref sent from parent component to the dialog in the child component
   - That is not a good practice
   - We have to map the ref send from parent component to a local `useImperativeHandle` method
   - It takes 2 arguments
       - ref as first argument
       - a function that exposes all the methods and variable that can be access in parent component using the ref it sends
   - We can then have a local ref in the child component that we can then call in the `useImperativeHandle` function
   - In parent component we will call the ref.current.open(), that will call the local ref's showModal() method

```Child component
import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ ref, result, targetTime }) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }

      close: () => {

      }
    };
  });

  return (
    <dialog className="result-modal" ref={dialog}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stop the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

```

7. Portals
   - It is used to teleport an HTML code to a particular place in DOM
   - Example
   - The dialogue box we used is nested inside the content of the components
   - If we want to place it at a specific place in DOM, we can use the portals
   - Import {createPortal} from `react-dom`
   - Wrap the return statement of the component in `createPortal`.
   - Create portal takes 2 arguments, first the HTML code that we wrapped
   - Second the element where we want it to render using document.getElementById()

```
import { createPortal } from "react-dom";
export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {
  ...

  return createPortal(
    <dialog className="result-modal" ref={dialog}>
      {!userLost && <h2>Your score : {score}</h2>}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
}

```

```index.html
<body>
    <div id="modal"></div>
    <div id="content">
      <div id="root"></div>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>

```
