# Forms

1. Things that need to be handled

   - Form Submission
   - Validations

2. In React, we cannot use `for` key in label, we have to use `htmlFor`

```
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" />
```

3. By default, button in a form submit the form and sends an HTTP request to the React serving server (that we run using `npm run dev`)
   - To prevent the default behavior we can set the type of the button equal to `button` (default type is `submit` type)
   - Better approach is to not add `onClick` event listener on the button but to add `onSubmit` event listener on the `form` element

```
  function handleSubmit(event) {
   event.preventDefault();
   console.log('Submitted');
  }

  return (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  );
```

4. Reading values of the form element
   - Using the `setState` and `onChange` hooks
   - Using the refs

5. Two-way binding using the React hooks

```
export default function Login(event) {

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValues);
  }

  function handleInputChange(identifier, event) {
    setEnteredValues(prevState => ({
      ...prevState,
      [identifier]: event.target.value
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange('email', event)}
            value={enteredValues.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleInputChange('password', event)}
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  )

```