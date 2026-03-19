1. There are some react features that cannot be used in every react project like
   - React server components
   - Server actions
   - use() with Promises

2. They need special setup and special libraries to work.
   - Because some of these features needs the server side setup to run
   - By default the React code runs on the browser
   - So the special setup separates the code that will run on the client side and on server side like `Next.js`

3. React server components
   - Never executed on the client side
   - Either run on a server or in a build process but never on a client.
   - When we convert a react server component to a client component, it gets rendered on client as well as server side

4. If we have to use import with `@` then we have to add one `jsconfig.json`

``` jsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

```

5. Combining Client based components and React server components
   - RSC can directly include the client components in there JSX
   - But client component cannot include the RSC directly, with one exception. 
   - They can include them as children
   - Client component cannot be async components whereas RSC can be async components.

6. Fetching data in RSC
   - As the RSC are async functions, we can directly call the backend API to fetch the data
   - We don't need to use hooks like `useEffect`, etc. to wrap the code
   - We can use different fetching APIs from node as well that we cannot use with client components.

```
import fs from 'node:fs/promises';

export default async function DataFetchingDemo() {
  const data = await fs.readFile('dummy-db.json', 'utf-8');
  const users = JSON.parse(data);

  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}

```

7. Suspense
   - Works with `Suspense` for handling data fetching and loading fallback.
   - `use()` for Promises requires 'special promises', not the one that we can create programmatically in a component
   - We can put the data fetching code in a component
   - Use the suspense to load that component and to add fallback.
   - Suspense works only with RSC.



```Data-fetching.js
import fs from "node:fs/promises";

export default async function UsePromiseDemo() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await fs.readFile("dummy-db.json", "utf-8");
  const users = JSON.parse(data);
  
  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}

```

```page.js
export default async function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading users....</p>}>
        <UsePromiseDemo />
      </Suspense>
      
    </main>
  );
} 
```


8. `use` hook 
   - It can be used to getting access to context.
   - It can also be used to await promises in client components without using async await.
   - Let say in the previous example we have to make the data fetching component a client component
   - So we cannot use suspense on it.
   - In that case we have to move the data fetching code in the parent component, wrap it in a promise and then send it to the child component
   - It will go as a promise to the child component
   - then we can use `use` hook to access that promise content.

``` paren-component.js

export default async function Home() {
  const fetchUserPromise = new Promise((resolve) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users);
    }, 2000),
  );

  return (
    <main>
      <Suspense fallback={<p>Loading users....</p>}>
        <UsePromiseDemo usersPromise={fetchUserPromise} />
      </Suspense>
    </main>
  );
}
```

```child-component.js
export default async function UsePromiseDemo({usersPromise}) {
  const users = use(usersPromise);
  const [counter, setCounter] = useState(0);

  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

9. `ErrorBoundary`
   - We can wrap the `Suspense` with `ErrorBoundary` to handle the errors


```error-boundary.js
'use client';

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>An error occurred!</h2>
          <p>{this.state.message}</p>
          <p>{this.props.fallback}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

```home.js

export default async function Home() {
  const fetchUserPromise = new Promise((resolve) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users);
    }, 2000),
  );

  return (
    <main>
      <ErrorBoundary fallback={<p>Something went wrong...</p>}>
        <Suspense fallback={<p>Loading users....</p>}>
          <UsePromiseDemo usersPromise={fetchUserPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

```