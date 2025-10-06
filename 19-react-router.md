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