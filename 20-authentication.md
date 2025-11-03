## Authentication in react

1. Authentication is validating the user before allowing it to perform some action
   
2. Two ways to do authentication
   - Server side authentication
     - If the credentials entered by the user is correct then it stores the mapping of client ID and its authorization
     - So all further request from the same client can be directly passed to the correct resource
     - Client have to send its ID with all the requests
     - Not the best solution as client is tightly coupled with the backend
   - Authentication token
     - When client enters the valid credentials
     - Backend will generate a token and sends as a response to the client.
     - Client needs to add that token to all further requests

3. Query parameters in react routing
   - to set the query parameter we can directly pass it in the path 
   - For accessing the query parameter we can use `useSearchParams` hook
   - `useSearchParams` returns exactly 2 values 
     - first one is the list of current query parameters
     - Second one is the function to set a query parameter
```
      <NavLink to="/auth?mode=login">Login</NavLink>

      OR 

      {path="auth?mode=login", element: <LoginPage />}

```

```
function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isLogin = searchParams.get('mode') === 'login';

  return (<> ... </>);
}
```

4. Validating user credentials
   - Treat the user login form as a react-router `Form`
   - So when we submit it, it will call an action related to that component page
   - In that action we can extract the user information that user entered and can call an API to validate the credentials
   - if the credentials are valid then we can redirect to the home page else we can show errors on the login page itself by extracting the error messages from `useActionData` hook
   - we must return some response from the action in case of invalid credentials then only we can get that return value in the `useActionData`

```
export async function action({request, params}) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if(mode !== 'login' && mode !== 'signup') {
    throw new Response(JSON.stringify({message: 'invalid mode'}), {
      status: 422
    });
  }

  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if(response.status === 422 || response.status === 401) {
    return response;
  }

  if(!response.ok) {
    throw new Response(JSON.stringify({message: 'Could not authenticate user'}), {
      status: 500
    });
  }

  return redirect("/");

}
```