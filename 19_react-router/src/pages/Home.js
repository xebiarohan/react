import { Link, useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="products">the products list</Link>
      </p>
      <p>
        <button type="button" onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}
