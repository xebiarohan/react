## Code splitting

1. code splitting with lazy and Suspense is a performance optimization technique that lets you load parts of your app only when they’re needed, instead of shipping everything in one big bundle.

2. By default, bundlers like Webpack or Vite bundle your entire app into a single JavaScript file.

3. Core idea
    - React.lazy() lets you dynamically import a component.
    - Rules for using React.lazy()
        - Component must return a default export
        - Can only work with components
        - Must use it with suspense()

```js
import Dashboard from './Dashboard';   // common pattern

const Dashboard = React.Lazy(() => import('./Dashboard'));

```

4. Complete example

```js
import Lazy, {Suspense} from 'react'

export default function App() {

const AnotherComponent = React.Lazy(() => import('./AnotherComponent'));

return (
    <Susense fallback={<p>Loading...</p>}>
        <AnotherComponent />
    </Suspense>
);

}

```

```js
const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("./pages/Home");
      return { Component: module.default };
    },
  },
]);

```

5. How it works
    - User navigate to a route
    - On that component we have a Lazy component (child component)
    - Dynamic import triggers a network request 
    - JS chumk is downloaded
    - Meanwhile suspense fallback handles the GUI
    - When component loads then it replaces the fallback of suspense
