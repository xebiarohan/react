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
    - Installation : "npm install styled-components"
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

12.  Media queries, nested rules and Pseudo selectors in styled-components
    - We dont need to convert all the element to syled component, we can do with 1 wrapping component only
    - And for other components we can pass CSS through the wrapping component
    - Example if we have img, h1 elements in header element
    - Using &
    - For pseudo selectors there should not be any gap between & and :

```
const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: "Pacifico", cursive;
    margin: 0;
  }

  & {
    text-align: center;
    color: #a39191;
    margin: 0;
  }

  &:hover {
   background-color: #9a3412;
  }

  @media (min-width: 768px) {
    margin-bottom: 4rem;

    & h1 {
      font-size: 2.25rem;
    }
  }
`;
```

13. If these styled components can be used in multiple components, we can put them in seperate jsx class and can import in all those containers

```
import {styled} from 'styled-containers';

const Input = styled.input`
   background-color: white;
`;

export default Input;

```

14. Other way to design styled component
    - Example Label and Input are tightly coupled
    - So intead of creating sytled component of each like in the previous example
    - We can merge them in 1 component

```
import {styled} from 'styled-component';

const Label = styled.label`
     color: ${(props) => props.$invalid ? '#f87171': '#6b7280' };
`;

const Input = styled.input`
   background-color: ${({$invalid}) => $invalid ? '#fed2d2': '#d1d5db'};
`;

export default function DefaultInput({label, invalid, ...props}) {
   return (<p>
      <Label $invalid={invalid}>{label}</Label>
      <Input $invalid={invalid} {...props} />
   </p>);
}
```

15. Tailwind CSS
    - Installation: https://tailwindcss.com/docs/installation/using-vite
    - Install VS extension: Tailwind CSS IntelliSense