1. We can add markup in index.html
   - There is no rule that says that we have to put everything in the components only
   - we can use index.html if we have something that does not depend upon state, props, etc
   - example of index.html

```
  <body>
    <img src="game-logo.png" alt="test"/>
    <h1>Header in index.html</h1>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
```

2. Update the state based on previous state
   - DONT directly change the value like shown in first example
   - in the second approach setter method will automatically provide the current value to the function that we are passing

```
const [isEditing, setIsEditing] = useState(false);

function onButtonClick() {
  setIsEditing(!isEditing);       // wrong practice
}

  function handleEditClick() {
    setIsEditing((editing) => !editing);   // right approach
  }
```

3. Two-way-binding
   - we can use the useState to manage the state of the field that we want to change
   - then we can use the onChange event listener to check the change and can call a function on any change in the field
   - Function can set the new value in the variable using the set method of the useState

```
  const [playerName, setPlayerName] = useState(name);

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameField = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameField = <input type="text" value={playerName} onChange={handleNameChange} required />;
  }

```

4. Handling object and arrays in setState
   - Never directly update the values of object and arrays directly in the set method of useState 
   - Make a copy of it, update the value and then return it

``` Wrong way
let array = [1,2,3,4];
const [arr,setArray] = useState(array);

function handleArrayUpdate() {
  setArray((currentArray) => currentArray[3] = 6);        // wrong way
}

function handleArrayUpdate() {
  setArray(currentArray => {
    const updatedArray = [...currentArray];
    updatedArray[3] = 6;
    return updatedArray;                                 // Correct way
  })
}
```

5. Lifting state up
   - If a value is needed by more than 1 component
   - we can keep the state in the closest ansestor component
   - Value can be passed to the components using props.