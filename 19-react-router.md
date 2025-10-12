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

7. `NavLink`
   - We can use `NavLink` instead of Link to create links
   - It provides a better way to set the css classes
   - `className` attribute take a function that should return the class to implement on the link
   - function takes multiple parameter, one of them is `isActive`.
   - Another property is `end`, which specifies only consider this link active if the link ends with the path mentioned in the `to` property.
   - We get the same function for the inline styles as well

```
<NavLink
  to="/"
  className={({isActive}) => isActive ? classes.active: undefined}
  end={true}
  >Home
  </NavLink>
```

8. Navigation Programmatically
   - Like if a form is submitted, then we want to move to a different page.
   - We need to import `useNavigate` from `react-router-dom`
   - calling it will give us a function that can be used to navigate to different routes.

```
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <p>
        <button type="button" onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}
```

9. Dynamic routes
   - We can use colons `:` to make a path segment dynamic
   - we can use `useParams` to fetch the value of dynamic path in its mapped component
   - `useParams` returns a list of dynamic segments of the link.

```
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      {path: "/products/:productId", element: <ProductDetail />}
    ],
  }
])

```

```
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();

  return (
    <>
      <h2>{params.productId}</h2>
    </>
  );
}
```

10. Relative and absolute paths
    - All paths that we define are the absolute paths in the `createBrowserRouter`
    - All paths starting with `/` are absolute paths
    - It's better to use relative path in the children section when the parent path is anything other than `/`
    - To make a path relative, omit the first `/`.
    - The same goes for programmatic links (`NavLink and Link`), remove the first `/`

```
const router = createBrowserRouter([
  {
    path: "/root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: <Products /> },
      {path: "products/:productId", element: <ProductDetail />}
    ],
  }
]);
```

11. Relative path.
    - Path can be relative to 2 things
      - to the `route` definition defined in the `createBrowserRouter`
      - To the `path` in the browser
      - Using `..` takes it 1 step back based on the relative value

```
  <Link to=".." relative="path">Back</Link>
```

12. Index route
    - In the children routes, there is always a route that we want to load by default
    - In our example it is Home page
    - One way it to set the path value as empty string ""
    - Other way is to make it index route

```
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index:true element: <Home /> },
      { path: "products", element: <Products /> },
      {path: "products/:productId", element: <ProductDetail />}
    ],
  }
]);

```