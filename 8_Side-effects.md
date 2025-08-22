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
   - we don't need useEffect for these types of side effects
     - If a side effect code is already in a condition that cannot run every time we re-evaluate the component in that case we don't need to use useEffect hook
     - A synchronous code like fetching data from local storage

5. Dependencies in useEffect hook
   - state or prop values that are used in the useEffect hook.

6. Return function of useEffect
   - It gets called from the subsequent execution of useEffect or when the component is removed
   - In the below example we are clearing the timeout before starting another timeout

```
  useEffect(() => {
    const timeout = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

```

7. Problem with using function and objects as dependencies of useEffect hook  
   - A component when re-renders it creates all its function again.
   - Even if there is nothing changed in the function but after re-rendering the memory location of the function is changed
   - So the useEffect will be triggered again, that is not what intended.

8. useCallback hook
   - It is used to wrap the functions 
   - The wrapped function will not reinitialize if the component re-renders
   - So that we can pass that function as a dependency to the useEffect hook
   - Just like the useEffect, it also has a dependency array
   - So, it will reevaluate the wrapped function if any of the dependency is changed

```
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces"));
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }, []);
```

9. Adding key to any component call
    - If we want a child component to re-mount (re-render) when some value changes
    - We can add a key property on it equal to the value on whose change we want to remount the child component
    - We cannot have same key used in 2 different elements like on 2 different `div`

```
return (
  <div>
  ...
  <QuestionTimer
    key={activeQuestionIndex}
    timeout={QUESTION_TIMEOUT}
    onTimeout={handleSkipAnswer}
    />
  </div>
)
```