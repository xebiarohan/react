# Sending HTTP requests

1. We don't directly connect database to a React application
    - Due to security reasons
    - All the React code runs on the Browser of Users
    - They can access the code in their browser
    - Not all operations can be performed in the browser like accessing shared file system

run node code using : node app.js


2. We can use fetch API provided by JavaScript to send API request to backend

```
   fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });

```

3.  Fetching data is a side effect. So, we have to put this code in `useEffect` hook

```
  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);
```

4. Instead of using Promises we can use async-await in fetching data 

```
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }

    fetchData();
  }, []);
```

5. Handling HTTP errors
   - If the fetch API fails for some reason, it will throw an error
   - So, we have to use try-catch where we are calling the API
```
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        
        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({message: error.message || 'could not fetch places'});
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);

```

6. While fetching the data usually we have 3 states to manage
   - Data itself
   - Is fetching in progress
   - Is there any error occur while fetching the data

```
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
```

7. Extracting the data fetching code in a `js` file

```
export async function fetchData() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  const resData = await response.json();
  return resData.places;
}

```

8. Example of POST request 

```
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

```

9. 