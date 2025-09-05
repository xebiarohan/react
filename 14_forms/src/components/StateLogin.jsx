import Input from "./Input";
import { isEmail, isNotEmpty } from "../util/validation.js";
import useInput from "./hooks/useInput.js";

export default function StateLogin(event) {
  const {
    value: email,
    hasError: emailIsInvalid,
    handleInputChange: handleEmailChange,
    handleInputBlue: handleEmailBlue,
  } = useInput("", isEmail);

    const {
    value: password,
    hasError: passwordIsInvalid,
    handleInputChange: handlePasswordChange,
    handleInputBlue: handlePasswordBlue,
  } = useInput("", isNotEmpty);


  function handleSubmit(event) {
    event.preventDefault();

    if(emailIsInvalid || passwordIsInvalid) {
      return;
    }
    console.log(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          type="email"
          name="email"
          title="Email"
          onChange={handleEmailChange}
          onBlur={handleEmailBlue}
          value={email}
          error={emailIsInvalid ? "Email is Invalid" : null}
        />

        <Input
          id="password"
          type="password"
          name="password"
          title="Password"
          minLength={6}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlue}
          value={password}
          error={passwordIsInvalid ? "Please enter a valid password" : null}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
