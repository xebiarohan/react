## React router

1. React provides a way to create an SPA with the benefits of routing.

   - Routing tags different pages to different URLs. So that we can directly react that page
   - Install `npm install react-router-dom`

2. Setting up router
   - Import `createBrowserRouter` from `react-router-dom` in App.jsx.
   - Call the `createBrowserRouter` method with the list of all the routes
   - A route must contain at least a `path` and `element`.
   - Import `RouterProvider` from the `react-router-dom`
   - Use the `RouterProvider` to set the router

```
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/products', element: <Products/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
```

3. Alternative way to define routes (older way < 6.4)
   - Import `createRoutesFromElements` and `Route` from `react-router-dom`
   - create route definition
   - Pass the router definition to the `createBrowserRouter` function

```
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<Products/>} />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

```

4. Creating link to navigate between pages
   - Import `Link` from `react-router-dom`
  
```
      <p>
        Go to <Link to="/products">the products list</Link>
      </p>
```

5. Nesting of routes
   - We can have a parent page and then specific routes of that page
   - Here the children links can only be called from the `BasePage` component and its children
   - We need to define the `<Outlet>` where these component will be rendered


```
const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
    ],
  }
]);
```

```
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
     <h1>Base page</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

6. Setting error page
    - Use `errorElement` to set the page to load in case of an error
    - Mapped to the top most route "/"

```
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
    ],
  }
]);
```