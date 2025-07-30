1. First way is to add all the css in the index.css file and then import it in the main.jsx

```
import './index.css';
```

2. We can split this css file and can create more css files component specific like Header.css and can import it in Header component

3. Advantages of vanilla CSS

   - CSS code decoupled from JSX code

4. Disadvantages

   - CSS rules are not scoped to a component, but to the whole application

5. Inline style (second way)
   - We can pass an object dynamically
   - First {} is for the dynamic value
   - Second {} is of the object
   - If there is a hyphen in the key then we have to wrap it in quotes or use camelcase

```
<p style={{
        color: 'red',
        'text-align': 'center'
      }}>A community of artists and art-lovers.</p>


      OR

<p style={{
        color: 'red',
        textAlign: 'center'
      }}>A community of artists and art-lovers.</p>
```

6. Advantages and Disadvantages

   - Advantage
     - Stlyes only affect the element on which we are adding the style
     - We can add style dynamically based on condition
   - Disadvantage
     - Cannot reuse it
     - Styles are coupled with JSX code

7. Dynamic inline styling
   - Using ternary operator

```
   <p style={{
      backgroundColor: emailNotValid ? 'red': 'white'
   }}>{text}</p>
```

8. Dynamic CSS classes
   - Same as ternary operator
   - In second example lable css class is always applied, where as the invalid class is applied based on the condition

```
<p className={textIsInvalid ? 'invalid': ''}>{text}</p>

<label className={`label ${emailIsInvalid ? 'invalid' : ''}`}>EMAIL</label>
```
