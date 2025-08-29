# Class based components

1. Components can be of 2 types
   - Functional component (latest and better way to write components)
   - Class based components (deprecated way)

2. Example of class based component

```
class Product extends Component {
    render() {
        return <h2>A Product!</h2>
    }
}
```

3. Till 16.8 for managing the state and to handle the side effects we have to use the class based components. 
   - That is not the case with the latest versions of React (from 16.8).
   - From 16.8 version we get react hooks for functional components like `useState`, `useEffect`, etc.

4. Biggest challenge with Class based components is that React hooks does not work with them.

5. Class based components can work with function based components.

6. Comparison of syntax

```
import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}
 export default User;

//--------------------------------------------
const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};

 export default User;


```

7. State management in class based component
   - State in class based component is always an object.
   - State initialization happens using constructor.
   - Property name of the state must be `state`.
   - There can be only 1 state per component class.
   - There is a predefined function `setState` that is used to update the state.
   - `setState` <strong>merges</strong> the state passed to it to the current state value.

```
class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }

  toggleUsersHandler() {
    this.setState((currentState) => {
      return { showUsers: !currentState.showUsers };
    });
  }

  render() {
    ....
  }
}

```

8. Component life cycle methods
   - componentDidMount():
     - Called when the component is evaluated and rendered by React
     - Equivalent to `useEffect` hook with empty dependency list
   - componentDidUpdate():
     - Called when component updates
     - When React re-renders and re-evaluates the component
     - Equivalent to `useEffect` hook with some dependencies
   - componentWillUnmount(): 
     - Called right before component is removed

9. Example of life cycle methods
    - `componentDidUpdate` takes 2 parameters `previousProps` and `previousState`
    - It is used to `if` condition
    - If any prop or state is changed then we can execute some code based on the change


```
class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: "",
    };
  }

  componentDidMount() {
    // http request to get some users
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    ...
  }
}

```

10. Context in class based components
    - Creation of context is same as in the functional bases components
    - We can use `ContextName.Provider` to set the value of the context
    - We can consume max of 1 context in class based components
    - There are 2 ways to consume the context
      - using `<ContextName.Consumer></ContextName.Consumer>`
      - using `static contextType = contextName;`
    - `contextType` is a keyword

```
class Users extends Component {
  static contextType = UserContext;  
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }
  ...
}
```

11. Which type of component to use
    - Always try to use functional component
    - Use class component only in case of error boundary

12. Error boundary
    - Used to handle the exception thrown by the child components
    - In same component we can handle the exceptions using try catch
    - If we want to handle the exception in the parent component then we can use error boundary
    - Any component that implements `componentDidCatch()` method becomes error boundary component
    - This method gets triggered when one of child component throws an error