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

9. CSS Modules
   - Vanilla CSS with file-specific scope
   - Need to update the css class name example from Header.css to Header.module.css
   - Import needs to be changed as shown
   - and classes need to used with the 'classes' prefix (it can be of our choice)
   - In the example 'paragraph' is the name of the css class that we are applying on the '<p>' tag

```
import './Header.css';
      |
      |
      V
import classes from './Header.module.css';

<p className={classes.paragraph}>A community of artists and art-lovers.</p>

```

10. Styled Component
    - It is a package that you need to install in your application : "npm install styled-components"
    - It works like a react component
    - Example if we have a div and we are appling a css class on it
    - We can transform it into a styled component
    - It forwards all the classes that we apply to it using className prop

```
import {Styled} from 'styled-components';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;


export default function App() {
   return (

      <ControlContainer>
         ...
      </ControlContainer>

      <ControlContainer className={isInvalid? 'invalid':''}>
         ...
      </ControlContainer>
   );
}
```

11. Dynamic classes using sytled-components
    - We can set prop on the element, in the example prop name is invalid and emailNotValid is a boolean
    - Props can then be received by the functions inside the styled component
    - We can also use destructuring to directly write the props names instead of 'props'.
    - It is a common convention to use $ infront of props to be passed to styled component

```

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => props.$invalid ? '#f87171': '#6b7280' } 

`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({$invalid}) => $invalid ? '#fed2d2': '#d1d5db'} ;
  color: ${({$invalid}) => $invalid ? '#ef4444': '#374151'};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-color: ${({$invalid}) => $invalid ? '#f73f3f': ''};

`;

export default function App() {
let emailNotValid = true;
...
return (
   <Label $invalid={emailNotValid}>Email</Label>
   <input type="text" $invalid={emailNotValid} />
);
}
```
