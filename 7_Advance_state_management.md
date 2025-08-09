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

3. Context files are usually stored in folder store

```
              src ---> store
```

4. Setting the context
   - Create a class in the store folder example shopping-cart-context.jsx
   - import createContext from react
   - then set the defult value of context in the createContext method call
   - set it equal to a variable (name should start with capital letter) and export it.
   - Import the variable in the top most container where we need the context
   - Component that imports it and all its children component will have access to this context
   - Till React 18 we have to use <Content-name>.Provider but from React 19 we dont have to use Provider
   - We have to set a value prop on the context with the default value
   - This value is only used when a component that is not wrapped by the context tries to access the context


```shopping-cart-context.jsx
import {createContext} from 'react'

export const CartContext = createContext({
  items: []
});

```

``` In App.jsx

  return (
    <CartContext.Provider value={{items: []}}>
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