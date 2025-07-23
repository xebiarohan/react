1. We can add markup in index.html
   - There is no rule that says that we have to put everything in the components only
   - we can use index.html if we have something that does not depend upon state, props, etc
   - example of index.html

```
  <body>
    <img src="game-logo.png" alt="test"/>
    <h1>Header in index.html</h1>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
```

2. 