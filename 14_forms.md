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

6. `FormData`
   - Best way to handle the form elements
   - To use `FormData`, all the input fields must have `name` attribute
   - We have to pass the `event.target` to the `FormData`.
   - Now from the `FormData` we can get individual input fields using the `formData.get()` method
   - Or we can get the whole form object using the `formData.entries()` method
   - Multiple inputs with same name (like in case of checkbox) does not come in `formData.entries`. We have to get the value using `formData.getAll()`
   - Then we have to add it in the `FormData` object
   - We have to make button of type submit then only the `onSubmit` on the form element will get called.

```
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const email = formData.get('email');    // getting single input field

  const acquisitionChannel = formData.getAll('acquisition');
  const data = Object.fromEntries(formData.entries());

  data.acquisition = acquisitionChannel;
}

return (
 <form onSubmit={handleFormSubmission} onReset={handleReset}>
    ...
   
    <p className="form-actions">
           <button className="button button-flat" type="reset">Reset</button>
           <button className="button" type="submit">Login</button>
    </p>
</form>
);

```

7. Resetting a form
   - One way it to set the type of the Reset button equal to `reset`. It is used when we are not storing the state of the form elements using `useState`
       - As reset will just clear the form fields but does not change the value in the stored element in `useState` hook
   - Other way is to map a function to a button, set the type of button to `button` and call the function. In that function we can call setter method of `useState` hook.
   - Better way is to call the `reset()` function on the `event.target.form`

```
  event.target.form.reset();
```

8. HTML validations
   - we can use the HTML default validation like `required, minLength, maxLength, etc`

9. Custom validation  
   - We can add custom validation along with default HTML validations

10. We can also use 3rd party library as well for form handling like react hook form, `Formik`.
