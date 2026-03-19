1. In CSS we have `transition` property to apply animation to the HTML.

2. Syntax
   - In `transition` we pass the property on which we want to apply the animation
   - Then provide the duration of animation
   - Then the easing process
   - In the below example we are applying the animation on the transform property.
   - So when ever the `transform` property gets applied to the element, the animation will apply on that.
  
```example.css
.challenge-item-details-icon {
  display: inline-block;
  font-size: 0.85rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease-out;
}

.challenge-item-details.expanded .challenge-item-details-icon {
  transform: rotate(180deg);
}

```

3. CSS Animation
   - Another way to apply animation to an HTML element.
   - With syntax `@keyframes <identifier> { ... }`
   - Here we define the beginning, intermediate and end state.
   - Here identifier is the name of the animation.
   - Then we can use it on any element like here I used it on modal.

```index.css
.modal {
  top: 10%;
  border-radius: 6px;
  padding: 1.5rem;
  width: 30rem;
  max-width: 90%;
  z-index: 10;
  animation: slide-up-fade-in 0.3s ease-out forwards;
}

@keyframes slide-up-fade-in {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

```

4. Limitation of CSS animation
   - We can animate the element appearance but not the disappearance
   - Complex animations is not easy with CSS animations.

5. Framer-motion
   - Powerful library to animate a React application.

```installation.md
npm install framer-motion

```

6. Syntax
   - Import `motion` from `framer-motion`
   - Replace the element that you want to animate with `motion.<element-name>`
   - it takes `animate` attribute where we can pass any animation as an object
   - It also takes `transition` that is used to configure the animation
   - `x` is used to move the element on x-axis by defined pixels
   - `y` is used to move the element on y-axis by defined pixels
   - `rotate` is used to rotate the element

```example.html

      <motion.div
        id="box"
        animate={{ x: 40 , y: 30, rotate: 90}}
        transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
      />
```


```other-example.html
let isExpanded = true;


<motion.span animate={{rotate: isExpanded ? 180 : 0}}
```