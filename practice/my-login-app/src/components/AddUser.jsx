import { Form, useActionData } from "react-router-dom";

export default function AddUser() {
  const message = useActionData();

  return (
    <>
    <p>{message}</p>
      <Form method="post">
        <label htmlFor="name">Username</label>
        <input type="text" name="name" />
        <label htmlFor="age">Age</label>
        <input type="text" name="age" />
        <button type="submit">Save</button>
      </Form>
    </>
  );
}
