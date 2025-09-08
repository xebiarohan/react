# Form actions

1. Available in 19+ version of React.

2. Instead of calling the submit method on `onSubmit` event listener, we can call the function on action attribute of form
   - action is not a new attribute of form element
   - It is used to set the request path which is used when form gets submitted.
   - But here react kind of overrides this functionality and even call `event.preventDefault()`
   - Now the submit function contains the `formData` as its parameter that we use to make in old approach
   - We have to still make sure that the input fields must have `name` property
   - Once the form is submitted, the form is reset automatically

```
  function signupAction(formData) {
    const enteredEmail = formData.get('email');
    console.log(enteredEmail);

  }

  <form action={signupAction}>
  ...
  </form>
```

1. `useActionState` react hook
   - Used to manage the form in react
   - It takes 2 arguments, 
     - 1st the action function that is mapped to the form action
     - the default value of the return value of the action function
   - It returns an array with 3 values
     - the latest form state
     - Updated value of form action (now we have to map this function to the action attribute of form)
     - pending, a boolean that defined the submition of form is in action or not
   - We can use the latest form state object to check if we have any errors in the form
   - When we use `useActionState` hook then the `formAction` method takes 2 arguments
     - Previous state of the form (the last returned object from the same function)
     - `formData` containing the current mapped input fields

```
  function signupAction(prevFormState, formData) {
    const enteredEmail = formData.get('email');
    let errors: [];
    if(!enteredEmail.includes('@')) {
      errors.push('Email is invalid');
    }

    if(errors.length > 0) {
      return {errors};
    }

    return {errors: null};
  }


  const [formState, formAction, pending] = useActionState(signupAction, {errors: null});

  <form action={formAction}>
      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>
      ...

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
  </form>

```

2. Override reset behavior
    - By default when we click on submit button, the form resets
    - If we have an error in 1 field, and we click submit, the form resets and all the other valid values are lost
    - On reset the form is reset to default value.
    - Default value is null
    - So if we can store the values that user entered and set it equal to the default value of input fields.
    - We can store the value entered by the user in the `formState` returned by the `useActionState` hook
    - In case of error the `formState` can return an object containing errors as well as the values entered by the user

```
  function signupAction(prevFormState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChannel = formData.getAll("acquisition");

    let errors = [];

    if (!isEmail(email)) {
      errors.push("Invalid email address");
    }

    // Other validations on other fields

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          role,
          acquisitionChannel,
          terms,
        },
      };
    }

    return { errors: null };
  }

```

```
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>
        ...
    </form>
  );

```

3. The action function that the `useActionState` hook takes as a first parameter can be sync or async

```
  async function signupAction(prevFormState, formAction) {
    await someserviceCall();

    return new-derived-state;
  }

```