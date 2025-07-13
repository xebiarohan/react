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
   - we use curly branchets for dynamic values
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
   - First way is to directly add the source in the image tag, but during the build process, itcan get lost
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

``` using object destructuring
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
