import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();

  return (
    <>
      <h2>Product details</h2>
      <h2>{params.productId}</h2>
      <p><Link to=".." relative="path">Back</Link></p>
    </>
  );
}
