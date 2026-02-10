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

3. `useActionState` react hook
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

4. Override reset behavior
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

5. The action function that the `useActionState` hook takes as a first parameter can be sync or async

```
  async function signupAction(prevFormState, formAction) {
    await someserviceCall();

    return new-derived-state;
  }

```

6. When we click on form submit, the form sends a request to the backend and that can take time
   - During that time the Submit button is still enabled
   - User can click on it again
   - So we have to disable the button when form submission is in pending state
   - We can use the 3rd return value from the `useActionState` hook
   - OR we can use a new hook `useFormStatus`

7. `useFromStatus` hook
   - It gets imported from `react-dom`.
   - We cannot add this hook in the same component where we have the form
   - We have to use it in a child component
   - Best practice is to create a separate component for the `Submit` button
   - And then use this hook in that component
   - It returns multiple values like data, pending, action, etc
   - Pending is the most used value

```
export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </p>
  );
}

```

8. Registering `formAction` on multiple button in a form
   - If we have 1 submit button in a form then we can map the `formAction` in the form element using action attribute
   - If we have multiple buttons that we have to map then we can use `formAction` attribute on button element itself,
   - In this example below we are not using the `useActionState`, but we can use it if required

```
  function upvoteAction(formData) {
    console.log('Upvote');
  }

  function downvoteAction(formData) {
    console.log('Downvote');
  }


<button formAction={upvoteAction}></button>

<button formAction={downvoteAction}></button>

```

9. Need for `useOptimistic` hook 
   - Sometimes we do some action from form (like adding a value in database), and it takes some time
   - On finishing on that task we update some value on the HMI like increasing a counter
   - One way is to let the action complete and, then it will update the counter
   - Second we can be optimistic that the action will be successful, so we can update the counter first
   - And then check once the form action finishes
   - So this hook gives us a temporary value when the form is in Pending state

10. Syntax of `useOptimistic` hook
   - First argument of the hook is the parameter for that we want to set value optimistically
   - Second argument is a function that can take multiple values with first values fixed as previous value of the value that you want to set optimistically
   - Hook will return an array of exactly 2 values 
     - first is the updated optimistic value that we can use 
     - Second is the function that we can call to execute the function that we passed as the second argument to the hook
     - The argument we pass to the setter function will be passed to that function plus the first argument of that function is fixed and passed by react.
     - We can pass as many arguments as we want to this function
   - The value returned by this is only used when the form is in pending state.

```
  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) =>
    mode === "up" ? prevVotes + 1 : prevVotes - 1
  );
```


```Complete example
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
  const [upvoteFormState, upvoteFormAction, upvotePending] =
    useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction);

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) =>
    mode === "up" ? prevVotes + 1 : prevVotes - 1
  );

  async function upvoteAction() {
    setVotesOptimistically('up');
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically('down');
    await downvoteOpinion(id);
  }

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >UP </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >DOWN </button>
      </form>
    </article>
  );
}


```
