import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function CartErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  } else {
    return (
      <>
        <p>Error!!!</p>
      </>
    );
  }
}
