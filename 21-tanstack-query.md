## Tanstack Query

1. A library that help sends HTTP request to the backend

   - Tanstack does not send HTTP requests on its own
   - we have to write the code that sends the request
   - Tanstack query then manages the data, errors,caching of data etc

2. Currently, we are doing it using the `useEffect` hook and browser provided fetch API

3. Installation

   ```
    npm install @tanstack/react-query
   ```

4. Usage of Tanstack query
   - Import `useQuery` from `@tanstack/react-query`
   - Pass an object to it that contains
     - queryFn : function that will send the HTTP request
     - queryKey: an array that uniquely defines the request, used for caching
   - It returns an object that contains different values like data, isPending, error, isLoading, etc

```
 const {data, isPending, isError, error} = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

```

5. Need to wrap the component that is using Tanstack with its client provider
   - Import `QueryClient` and `QueryClientProvider` from the `@tanstack/react-query`

```
...

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

```

6. Caching in `useQuery`
   - By default `useQuery` caches the data returned by it.
   - It will return the same cached result if it encounters a new request with the same query key.
   - But it still sends the request to the backend to fetch the latest data
   - And then it replaces the current data.
   - This way we show the current cached data first then on receiving the latest data, replace the old with the latest data
   - Sending request is dependent upon the `staleTime` config. Default value is 0 (milliseconds) (means every time a new request is sent)
   - If the value is 5000 then if the second request is sent within 5000 millisecond then no backend request will be sent
   - `gcTime` is the garbage collection time defined till when the cached data is kept around (default is 5 minutes)
```

useQuery({
  queryKey: [],
  queryFn: fetchData,
  staleTime: 0,
  gcTime: 10000

})
```

7. `queryKey`
   - Used for caching the response data of `useQuery` hook
   - We can have multiple values in the `queryKey` array
   - We can also have dynamic values as an object

```
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: () => fetchEvents(searchTerm),
  });

  let content = <p>Please enter a search term and to find events.</p>;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error?.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event}/>
          </li>
        ))}
      </ul>
    );
  }

```

8. `queryFn`
   - By default query functions sends an object to the function defined in it
   - Object contains the 
     - `queryKey` array, 
     - signal object that is used to terminate the request in case we move to different page
     - and any data that we want to pass like `searchTerm` in the below example

```
import { fetchEvents } from "../../util/http";

...

const [searchTerm, setSearchTerm] = useState("");
const { data, isPending, isError, error } = useQuery({
  queryKey: ["events", { search: searchTerm }],
  queryFn: ({signal}) => fetchEvents(signal, searchTerm),
});

```

```
export async function fetchEvents({signal, searchTerm }) {
  let url = "http://localhost:3000/events";

  if(searchTerm) {
    url = url + '?search='+searchTerm;
  }

  const response = await fetch(url, {
    signal: signal
  });

  ...
}
```

9. Enabling and disabling query
    - we can disable and enable the query based on some parameter
    - Example for search bar, at the startup we don't want to search with empty string, so at that time we can disable it

```
useQuery({
  queryKey: ['events',{search: searchTerm}],
  queryFn: ({signal}) => fetchEvents(signal, searchTerm),
  enabled: searchTerm !== undefined
})

```

10. Difference between `isLoading` and `isPending`
    - `isLoading` returns true only when the query is executed and waiting for the response
    - `isPending` returns true when the query is executed and waiting for the response as well as when the query is disabled, waiting for it to be enabled
    - It's better to use `isLoading`

11. `useMutation`
    - `useMutation` is better optimized for post requests as compare to `useQuery`
    - We have same configuration object in the `useMutation` that takes `mutationFn`
    - we usually don't use `mutationKey` as we don't want to cache the post request
    - `useMutation` unlike `useQuery` does not send request on its own, it returns an object that contains mutate property.
    - Mutate property is used to send the request
    - In the below example the object passed to the mutate function will be passed to the `createNewEvent` function while calling it

```
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

```

12. Invalidating queries in `useMutation`
    - Once the post request is sent from the mutation function, we can perform some action like redirecting to another page, etc.
    - For that we have a specific property in `useMutation` hook `onSuccess`, that get called when the mutation function completes.
    - Here we can use navigate to redirect to different page
    - Other thing we can do is to invalidate the other queries because using post we just updated the data, and we want `useQuery` hook to fetch the data again.
    - To force refetching we have to invalidate the queries
    - So we can use `QueryClient` to invalidate the queries
    - In App.js we defined the `QueryClient`, mode it to a class from where we can import it in different components
    - Import it in the component and in App.js
    - then call `invalidateQueries` on `queryClient` and pass the query key to it
    - All the queries that contain this query will get invalidated
    - It's not important to define exact `queryKey` of a `useQuery` hook
    - We can define any 1 value and all the `useQuery` containing that query gets invalidated
    - If we want to pass the exact same `queryKey` we can do that and set the `exact` value to true


```http.js
  export const queryClient = new QueryClient();
```

```
  import { queryClient } from "../../util/http.js";

  export default function NewEvent() {
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
      mutationFn: createNewEvent,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["events"], exact: false});
        navigate('/events');
      }
    });

    ...

  }

```

```App.js

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

```