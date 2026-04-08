import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  //const [formState, updatedFormHandler, isPending] = useActionState(handleFormData, {error: '',})

  function handleFormData(formData) {
    setErrorMessage("");
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (data.username === "rohan" && data.password === "12345") {
      navigate("/user-form");
    } else {
      setErrorMessage("Invalid credentials");
    }
  }

  function displayErrorMessage() {
    if (errorMessage !== "") {
      return <h2>{errorMessage}</h2>;
    }
    return "";
  }

  function handleReset(event) {
    event.target.form.reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h2 className={classes.title}>Welcome Back</h2>
        <p className={classes.subtitle}>Login to your account</p>
        {displayErrorMessage()}

        <form action={handleFormData} className={classes.form}>
          <div className={classes.inputGroup}>
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter username" />
          </div>

          <div className={classes.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <div className={classes.actions}>
            <button type="submit" className={classes.loginBtn}>
              Login
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={classes.resetBtn}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
