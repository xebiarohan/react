# Side effects and useEffect hook

1. Side effects
   - Tasks that needs to executed but does not impact the component's render cycle.
   - Example of side effect
     - A component renders the list of student in a school
     - In the same component we are fetching the student list from the backend application
     - This fetching of data from other source is side effect, as it has no impact on the component rendering
     - Component can first render with empty student list
     - So this fetching is needed but does not impact the component's render cycle

2. Problem with Side effects
   - If we have the side effect code directly present in a component (outside any condition)
   - Then it can cause an infinite loop
   - Example
     - Continuation of last example
     - We will fetch the student list from backend using an API
     - Then we will use useState or useReducer to update the list
     - These React hooks will re-render the component
     - Re rendering will call the fetch API again, and it becomes an infinite loop

3. Solution : useEffect hook
   - It takes 2 arguments
   - First one is an anonymous function that takes the side effect code (example API call)
   - Second argument takes the list of dependencies (that is used to check if we want to run the side effect code again or not)
   - useEffect runs the side effect code after completion of the component rendering
   - Side effect code updates the state so the component re-renders
   - Now side effect will check if any value in the list of dependency list is changed then it calls the side effect code again
   - Else it stops the execution there itself
   - If we send empty list of dependency then it will run the side effect code only once

```
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

```

4. Don't use useEffect for all side effects
   - As it is an extra execution (executes the useEffect hook after component execution completes)
   - we don't need useEffect for types of side effects
   - 