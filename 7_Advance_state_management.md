# Advance state management

1. Problem with useState and prop drilling

   - In the bigger applications we have lots of state to manage and to share between mutiple components
   - Sharing state is difficult to manage using props
   - Prop drilling means sharing prop to the components that themselves does not use it but pass it to its child components.

2. React's Context API

   - Used to share data between component easily.
   - we create a context that wraps a number of components
   - Then we can add the data to share between component in that context
   - All the component in the context has access to that data
   - The components wrapped by the context reevaluates when the context value is changed

3. Context files are usually stored in folder store

```
              src ---> store
```

4. Setting the context
   - Create a class in the store folder example shopping-cart-context.jsx
   - Import createContext from react
   - Set the placeholder value of context in the createContext method call
   - This value is only used when a component that is not wrapped by the context tries to access the context
   - Set it equal to a variable (name should start with capital letter) and export it.
   - Import the variable in the top most container where we need the context
   - Usually where are storing the state of the data that we want to set in context
   - Component that imports it and all its children component will have access to this context
   - Till React 18 we have to use <Content-name>.Provider but from React 19 we dont have to use Provider
   - We have to set a value prop on the context with the default value
   - In the context we have to provide way to read the value as well as to update it
   - Create a variable that holds the value from the state and add a method that calls the setter method of the state

```shopping-cart-context.jsx
import {createContext} from 'react'

export const CartContext = createContext({
  items: []
});

```

```In App.jsx
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
    addItemToCart: () => {}
  });

  function handleAddItemToCart(id) {
    setHoppingCart(prevState => {
      return {...}
    })
  }

  const context = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart
  }

  return (
    <CartContext.Provider value={context}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop></Shop>
    </CartContext.Provider>
  );

```

5. Using the context value
   - Import the declared context in the component
   - Now we can use 1 of 2 hooks
     - useContext
     - use
   - Difference between both is that 'use' hook is a bit more flexible, we can use it in conditions like if-else
   - Where as useContext hook like any other hook needs to be directly declared in the component not inside any condition
   - use hook available from React 19 or higher

```
import {useContext, use} from 'react';

import {CartContext} from './store/shopping-cart-context.jsx';

export default function Cart() {
  const catCtx = useContext(CartContext);
}

```

OR

```
import {useContext, use} from 'react';

import {CartContext} from './store/shopping-cart-context.jsx';

export default function Cart() {
  if(true) {    // adding random condition just for explaination
    const catCtx = useContext(CartContext);
  }
}
```

6. Alternative way to consume the context (in react older versions)
   - Just like we can use <CartContext.Provider></CartContext.Provider> to wrap the producer
   - There is <CartContext.Consumer></CartContext.Consumer> to wrap the consumer component
   - It wraps a function, and the argument of that function contains the current value of the context
   - useContext is the better way to read the context

```
export default function Product() {

  <CartContext.Consumer>
  {(contextValue) => {
    return (<div>...</div>);
  }}
  </CartContext.Consumer>
}

```

7. Extracting state and context management
   - Currently we are Setting the state and context in one main component (like in App.jsx)
   - Which makes the code cluttered
   - We can extract the state and context management in its seperate class
   - In the shopping-cart-context.jsx we can export a default function that handles the state and the context
   - It takes a children prop where we can forward the context of that main component (App.jsx)

```context
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemsOfCart: () => {}
});

export default function CartContextProvider({children}) {
  const [shoppingCart, setShoppingCart] = useState({
        items: []
      });
  function handleAddItemToCart(id) { ...}

  function handleUpdateCartItemQuantity(productId, amount) {...}

  const context = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemsOfCart: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
```

```App.jsx
function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}
```
