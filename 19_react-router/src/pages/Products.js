import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "product-1", title: "abc" },
  { id: "product-2", title: "xyz" },
];

export default function Products() {
  return (
    <>
      <h1>The products page.</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
