import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import Cart, { UserLoader } from "./components/Cart";
import CartErrorPage from "./components/CartErrorPage";
import AddUser from "./components/AddUser";
import UserErrorPage from "./components/UserErrorPage";
import { Provider } from "react-redux";
import Store from "./store/Store";
import CartRedux from "./components/CartRedux";

const router = createBrowserRouter([
  { path: "/", element: <CartRedux /> },
  {
    path: "/cart",
    element: <Cart />,
    loader: UserLoader,
    errorElement: <CartErrorPage />,
  },
  { path: "/user-form", element: <UserForm /> },
  {
    path: "/user",
    element: <AddUser />,
    errorElement: <UserErrorPage />,
    action: async ({ request }) => {
      const formData = await request.formData();
      console.log(formData.get("name"));
      throw new Response("Error message", {
        status: 500,
        statusText: "Server error",
      });
    },
  },
]);

function App() {
  return (
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
