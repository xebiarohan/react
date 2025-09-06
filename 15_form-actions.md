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