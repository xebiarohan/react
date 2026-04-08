import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import Cart, { UserLoader } from "./components/Cart";
import CartErrorPage from "./components/CartErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/cart", element: <Cart />, loader: UserLoader, errorElement: <CartErrorPage />},
  { path: "/user-form", element: <UserForm /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
