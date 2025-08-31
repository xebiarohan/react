1. In react we don't need JSX, but it is convenient to use it
   - In the first example is a simple HTML code that we can write it in JSX file
   - In the second example we don't need any build process

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
   - But this wrapping `div` is redundant
   - We can replace it with React's Fragment, that will not add an extra `div` in the deployed code
   - In latest java this `Fragment` is also replaced by simple open-close element tag

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
4. Multiple JSX slots
   - we can pass multiple JSX values to the child component
   - In the below example we are sending buttons and tab content, 2 JSX codes to the Tabs component
   - Main point is that we can send any renderable value as a prop, that can be an HTML element, an object, an array, a number, a string, etc.

```
  let tabContent = <p>Please select a topic</p>;

  const buttons = (
    <>
      <TabButton
        onClick={() => handleSelect("components")}
        isSelected={selectedTopic === "components"}
      >
        Components
      </TabButton>
    </>
  );

  return (
    <Section title="Examples" id="examples">
      <Tabs buttons={buttons}>{tabContent}</Tabs>
    </Section>
  );

```

```
export default function Tabs({children, buttons}) {
  return <>
    <menu>
        {buttons}
    </menu>
    {children}
  </>;
}

```

5. Setting component types dynamically
   - In the above example we saw in Tabs we are passing buttons to `<menu>` element
   - But we can make it dynamic, instead of just hard coded menu
   - we can get the type as a prop
   - If the element type is existing HTML element like `ul, menu, div`, etc. we can pass them as a string
   - In case of custom element type that we created like Tabs, App, etc. we have to pass it in curly brackets
   - example `buttonsContainer={Section}`
   - In the receiving component we have to wrap the value in a local constant and then use that constant as an element
   - Or we can pass the prop value with the first capital letter like `'ButtonsContainer'` then we don't have to create a local variable

```
export default function Tabs({ children, buttons, buttonsContainer }) {
  const Container = buttonsContainer;
  return (
    <>
      <Container>{buttons}</Container>
      {children}
    </>
  );
}
```

```
  return (
    <Section title="Examples" id="examples">
      <Tabs buttons={buttons} buttonsContainer="menu">{tabContent}</Tabs>
    </Section>
  );
```

6. Setting default value of a prop
   - we can add the default value in the prop receiving component
   - then that prop becomes non-mandatory to pass from the parent component

```
export default function Tabs({ children, buttons, buttonsContainer = "menu" }) {
  const Container = buttonsContainer;
  return (
    <>
      <Container>{buttons}</Container>
      {children}
    </>
  );
}

```