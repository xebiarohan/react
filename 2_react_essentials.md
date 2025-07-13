1. Components
   - Building blocks of UI
   - Wraps HTML, CSS and Javascript togather
   - Reuseable
   - Uses JSX - Javascript syntax entension
   - JSX is used to describe and create HTML element in Javascipt in a DECLARATIVE way
   - Must follow 2 rules
     - Name starts with Uppercase
     - Returns "Renderable" content (can be displayed on the screen), also allowed : string, array, number, boolean, null, object

2. React project comes with a build process that transforms JSX code to make it work in the  browser

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