# Redux

1. A state management system for cross component and app-wide state
   - Data that when changed, should affect the UI
   - Local state: when state is specific to a single component
   - Cross component: when state is common between multiple components
   - App wide: When state is common between all the components of the application example user authentication

2. Redux vs React context.
   - React context has potential disadvantages
     - Setup can be complex
     - Performance

3. Core Redux concept
   - Maintains one central data store (state)
   - Components subscribes to the store, when data changes, components gets notified.
   - Components NEVER updates the state in the store
   - Reducer function is used to update the state in the store
   - Components triggers some actions.
   - Actions are forwarded to the reducer function by Redux