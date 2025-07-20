1. In react we dont need JSX but it is convinient to use it
   - In the first example is a simple HTML code that we can write it in JSX file
   - In the second example we dont need any build process

```
<div id="content">
  <p>Hello world!</p>
</div>

```

```
React.createElement('div', 
  {id: 'content'},
    React.createElement('p',
      null,
      'Hello world!
    )
)
```

2. Fragments
   - We must have 1 parent element per component, we cannot have 2 sibling elements at the top
   - But this wrapping div is redundant
   - We can repace it with react's Fragment, that will not add an extra div in the deployed code
   - In latest java this Fragment is also replaced by simple open-close element tag

``` correct syntax without Fragment
return (
  <div>
    <p>...</p>
    <p>...</p>
  </div>  
)
```

```
import { useState, Fragment } from "react";
export default function App() {
  return (
    <Fragment>
      <p>...</p>
      <p>...</p>
    </Fragment>  
  );
}
```

```
import { useState } from "react";
export default function App() {
  return (
    <>
      <p>...</p>
      <p>...</p>
    </>  
  );
}
```

3. Forwarding props to wrapped elements
   - If we have multiple props to be applied on the same element, then first way is to do each manually
   - Better way is to use spread operator 
   - All the props other than the specific ones (in this example title and children) then applied to the element where we use the spread operator

```
export default function Section({ title, children, id, className }) {
  return (
    <section id={id} className={className}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

```
export default function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```
