1. Components

   - Building blocks of UI
   - Wraps HTML, CSS and Javascript togather
   - Reuseable
   - Uses JSX - Javascript syntax entension
   - JSX is used to describe and create HTML element in Javascipt in a DECLARATIVE way
   - Must follow 2 rules
     - Name starts with Uppercase
     - Returns "Renderable" content (can be displayed on the screen), also allowed : string, array, number, boolean, null, object

2. React project comes with a build process that transforms JSX code to make it work in the browser

3. React application starts from index.html
   - there we call the first script of index.jsx
   - in index.jsx we create entrypoint and render App component

```
   index.html --- script-call--> index.jsx ----entrypoint-render---> App component
                                                                           |
                                                                           |
                                                                           V
                                                                      Nested components
```

4. We can create a component using a function in a jsx file.
   - we can have multiple component in the same jsx file (multiple methods)
   - We can then use those components like an element of HTML

```
function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;

```

5. Dynamic content in a component
   - We use curly brackets for dynamic values
   - we can put any expression in the curly brackets (not if-else, for loop)

```
const reactDescription = ['Fundamental', 'Crutial', 'Core'];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

function Header() {
  const description = reactDescription[getRandomInt(2)];

  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
```

6. Importing image the right way
   - First way is to directly add the source in the image tag, but during the build process, it can get lost
   - Better way is to use the import statement
   - we can keep anyname during the import

```
   <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
```

```
import reactImage from './assets/react-core-concepts.png';

function Header() {
  return (
    <header>
      <img src= {reactImage} alt="Stylized atom" />
      <h1>React Essentials</h1>
    </header>
  );
}
```

7. Props
   - Use to pass data to the components
   - We can pass all types of data as props to a component: string, number, array, object, boolean, etc
   - The component to which we are passing these paramters must accept a parameter usually named props, but can be named anything
   - If there is an object that contains the exact same values that we want to pass it in prop then we can use spread operator
   - We can either use props as a paramter in the receiving component or we can use object destructuring
   - The advantage of destructuring is we can set default value of some variables.

```
function CoreConcecpt(props) {
  return (
    <li>
      <img src={props.img} alt={props.title}></img>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core concept</h2>
          <ul>
            <CoreConcecpt title="Components" description="The code UI building block." img={componentImage}/>
            <CoreConcecpt {... CORE_CONCEPTS[1]} />
            <CoreConcecpt {... CORE_CONCEPTS[2]} />
          </ul>
        </section>
      </main>
    </div>
  );
}
```

```using object destructuring
function CoreConcecpt({image, title, description}) {
  return (
    <li>
      <img src={image} alt={title}></img>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

```

8. CSS files
   - The default css file (index.css) needs to be imported in index.jsx
   - Similarly the other component specific css files needs to be imported in those component class
   - Just because we are adding a CSS style in a component specific file that does not mean that the scope of the CSS is limited to that component only. we can use it in other component as well

```Example
import './Header.css';
```

9. Folder structure
   - In assets create component folder
   - In component folder create component specific folders like Header, footer, Description, etc
   - In those folders put the jsx and css files

```
      assets -> component -> Header
                              /  \
                             /    \
                            /      \
                    Header.jsx   Header.css

```

10. Children prop
    - we can pass the value in the opening and closing element tag of a component
    - That can be accessed using the props.children

```
  <TabButton>Components</TabButton>
```

```
export default function TabButton(props) {
    return <li><button>{props.children}</button></li> ;
}
```

11. Event listeners
    - we can listen to different events on HTML elements using on... like onClick, onHover, etc
    - we then pass the function that we want to call to that event listener
    - we can also get the function to call as a prop.

```
export default function TabButton(props) {
  function handleClick() {
    console.log("Hello world");
  }

  return (
    <li>
      <button onClick={handleClick}>{props.children}</button>
    </li>
  );
}
```

```
 <TabButton onSelect={handleSelect}>Components</TabButton>


export default function TabButton({children, onSelect}) {
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}

```

12. Passing arguments to event listener functions
    - Using arrow functions
    - In the example we have a handleSelect function that takes 1 argument
    - We are passing this function as a prop to the TabButton component
    - There it is mapped to a button call (as shown in the previous point)

```
  function handleSelect(selectedButton) {
    console.log(selectedButton);
  }

  <menu>
    <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
    <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
    <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
    <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
  </menu>

```

13. By default a react component is executed once, we have to tell react to execute any component again

    - Just because a value of a component is changed that does not mean it will rerender itself

14. Managing state and using hooks
    - First we have to import it from the react
    - All hooks starts with 'use' keyword
    - React hooks are special functions that must be directly called inside component function, not inside any other function that is inside component function.
    - Hooks must be called on the top level of the component function

```
import {useState} from 'react';
function Counter() {
  const [isVisible, setIsVisible] = useState(false);
  ...
}
```

15. Hook useState
    - Use to store some data, reloads the component function where it is getting called by the data is updated.
    - It returns an array that has exactly 2 elements
    - First element is the current value of the variable that we are storing
    - Second argument is the function that is used to update the value of the variable
    - Even if we are changing the value of the variable we are using const, because the component is rerendered and the variable is created again.
    - Then on some action like button click we can use the function to set the value of the variable.
    - Default value can be null like useState()

```
import { useState } from "react";

function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
    </div>
  );
}

```

16. Rendering a content conditionally
    - We can add condition while rendering the HTML elements
    - Using the ternary operator
    - Using && operator
    - Using if else

```
          {!selectedTopic ? (
            <p>Please select a topic</p>
          ) : (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )}
```

```
    {!isSelectedTopic && <p>Please select a topic</p>}
```

```
let tabContent = <p>Please select a topic</p>;

if(isSelected) {
  tabContent = (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          );
}


return ({tabContent});

```

17. Dynamic CSS
    - Use ternary operator to dynamically apply css
    - Use className prop on the elements to apply css

```
export default function TabButton({children, onSelect, isSelected}) {

  return (
    <li>
      <button className={isSelected ? 'active': ''} onClick={onSelect}>{children}</button>
    </li>
  );
}

```

18. Outputting list data dynamically
    - In the first example we are writting the same code multiple times
    - CORE_CONCEPTS array contains title, description and image values
    - but if we array does not contains 4 elements, it will fail
    - We can use the map() method to transform the array item to an JSX element
    - Need to add key on each element that takes a unique value

```
          <ul>
            <CoreConcecpt {...CORE_CONCEPTS[0]} />
            <CoreConcecpt {...CORE_CONCEPTS[1]} />
            <CoreConcecpt {...CORE_CONCEPTS[2]} />
            <CoreConcecpt
              title={CORE_CONCEPTS[3].title}
              description={CORE_CONCEPTS[3].description}
              image={CORE_CONCEPTS[3].image}
            />
          </ul>
```

```
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (
              <CoreConcept key={conceptItem.title} {...conceptItem}></CoreConcept>
            ))}
          </ul>
``
