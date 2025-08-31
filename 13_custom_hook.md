# Custom hooks

1. Rules of hooks
   - Only call hooks in the component function or from inside other hooks
   - Only call hooks on the top level, not nested in some condition

2. Why we need custom hooks
   - If we have similar HTML code in multiple components then we can extract them in a separate component and it in both components
   - If we have similar logic like implementation of `useEffect` hook in multiple components, then we cannot just extract the `useEffect` function and can keep it in a separate component.
   - So, for these types of problems where we want to reduce the duplicity of non-renderable code we use custom hooks

3. All the functions starting with `use` is considered as hooks. So, a custom hook name must start with `use`

4. Example of custom hook
   - Declare just like any other function
   - Can return an array, string or an object that provides different states or set state methods
   - When a state is changed in the custom-hook, the component that uses it also re-renders

```
export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}

```


```
export default function App() {
   const { isFetching, fetchedData: userPlaces, setFetchedData: setUserPlaces, error } = useFetch(fetchUserPlaces, []);
}

```
