## Zustand

1. Zustand is a lightweight state management library for React.
   - It lets you create global store and use it anywhere in our app, without the actions, reducers, provider, etc

2. Core Idea
   - You create a store (global state) using a hook, and then use that hook anywhere.

3. Installation

```js
    npm install zustand
```

4. Creating a store

```js
export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementWithValue: (value) =>
    set((state) => ({ count: state.count + value })),
}));
```

5. Using it in a function

```js
export default function Counter() {
  const store = useStore();

  return (
    <>
      {store.count}
      <button onClick={store.increment}>Increment</button>
      <button onClick={store.decrement}>Decrement</button>
    </>
  );
}
```

6. Other features
   Selective subscription - the component will only re-render when the count gets updated
   No provider needed - like in redux we need Provider to register store

```js
const count = useStore((state) => state.count);
```

7. Async actions

```js
import { create } from "zustand";

export const useStore = create((set) => ({
  isLoading: false,
  users: [],
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      set({
        users: data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },
}));
```

8. Another example
```js
const useStore = create((set) => ({
  loading: false,
  items: [],
  error: null,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  fetchItems: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Not able to fetch the data");
      }

      const fetchedItems = await response.data();
      set({
        items: fetchedItems,
        loading: false,
      });

    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));
```
