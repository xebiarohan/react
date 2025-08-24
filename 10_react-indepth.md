# React in depth

1. Preventing extra component rendering
    - If we can have many child components of a component
    - If the state of the parent component is changed then it causes the re-rendering of parent component as well as the child components
    - Sometimes child component rendering is not even required
    - To prevent re-rendering of child component we can use `memo` from `react`
    - The child component will only be re-executed when the props send to it change, it compares the memory location of the props. So, in case of function and object they need to be exactly same.
    - Memo only impacts the external component re-rendering. Component change in case of state change is not impacted by memo
    - Don't overuse memo, use it on a component as high up the component tree as possible.
    - Overusing memo also causes performance issues as it always checks props before re-rending component

```
import {memo} from 'react';
const Counter = memo(function Counter({initialCount}) {
    return (<div>...</div>);
});

export default Counter;


```

1. `memo` has the same issue as the `useEffect` hook related to functions and objects
   - As the parent component re-renders, it will recreate all its functions and objects
   - Those value passed as prop to child component cause re-rendering even when we use `memo`
   - So we can use `useCallback` hook around those functions to stop there re-rendering if it is not required

```
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

```

3. Other way to decrease the child component re-rendering
   - Extract the state change in a separate child component from parent component
   - As on parent state change all the child component gets changed
   - Extract that code in a child component and lift the state to the parent that is required by other child
   - So the parent will not re-render all the time and so does other children components

4. `useMemo` hook
   - It is completely different from the `memo`.
   - `memo` is wrapped around the component functions to help decrease the unwanted rendering of component functions
   - `useMemo` is wrapped around normal functions in a component to prevent there execution if not required
   - `useMemo` should be only used when there is a complex function that you don't need to execute again and again with same input values
   - It takes an anonymous function as first argument that calls the real complex function and dependencies as second argument
   - It stores the result internally for a given value so that it need not re-execute the function for the same value

```
function isPrime() {
    ...  // some complex function
}

export default function App({num}) {

const initialCountIsPrime = isPrime(num);  // Before without useMemo

const initialCountIsPrime = useMemo(() => isPrime(num), [num]);

}

```

5. Virtual DOM
   - When a state value of a component changes the component re-renders
   - Re-rendering does not mean scrapping its whole HTML and creating new HTML elements from scratch in DOM
   - React uses a concept of Virtual DOM
   - When component re-renders, the new returned HTML code is created in the Virtual DOM and then gets compared to the real DOM element
   - Only the difference between then is applied to real DOM element
   - Virtual DOM is in memory so works faster than the real DOM

6. Key in React
   - When we have a dynamic list of similar components then we have to pass a key that uniquely identifies each component
   - when the key value is changed on a component then in Virtual DOM the existing component is scraped and new component is created from scratch.

7. State scheduling and batching
   - Calling the setter method of the `useState` schedules the state change
   - Always use the previous value function to update the new state in setter method
   - If we are calling the setter method multiple times in the same function, behind the scene React does the batching and execute the component only once.

8. `Million JS`
   - Package to improve the React application speed
   - Check website for config

```
npm install million

```