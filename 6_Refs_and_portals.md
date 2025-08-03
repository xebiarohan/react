1. Refs introduction
   - Used to get the reference of DOM elements
   - Need to import 'useRef' from react
   - we have to create a variable using the useRef() method (const playerName = useRef();)
   - Add the ref prop to the element to which you want to map (ref ={playerName})
   - then the ref variable (playerName in this example) will have access to all the properties of that element
   - while accessing the value we have to use variableName.current.propertyName to access the properties


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

2. Refs are not for manupulating the DOM elements, it is usually used for reading element values.

3. Difference between Refs and state
   - In the first render cycle we dont have the ref connection to element
   - When Refs changes the component function does not rerenders
   - Refs connects element to value from the second render cycle.
   - State should be used for the values that is directly renders on the UI