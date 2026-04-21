import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function UserErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse) {
    return (
      <>
        <p>{error.data}</p>
        <p>{error.status}</p>
      </>
    );
  }
  return (
    <>
      <p>Error!!!</p>
    </>
  );
}
