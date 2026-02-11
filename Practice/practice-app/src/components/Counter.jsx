import {useCallback, useEffect, useReducer } from "react";

function counterReducer(prevState, action) {
    if(action.type === 'INCREMENT') {
        return prevState + 1;
    } else {
        return prevState -1;
    }
}

export default function Counter() {
    const [counter, counterDispatcher] = useReducer(counterReducer, 0);

    function handleIncrement() {
        counterDispatcher({
            type: 'INCREMENT',
        });
    }

    function handleDecrement() {
        counterDispatcher({
            type: 'DECREMENT',
        })
    }

    useEffect(() => {
        // calling the side effects
        () => {
            // called on the subsequent useEffect call or just before the component is destroyed
        }
    },[]);

    const abc = useCallback(function abc() {

    },[]);

    return (<>
        <p>Counter : {counter}</p>
        <button onClick={handleIncrement}>Increement</button>
        <button onClick={handleDecrement}>Decrement</button>
    
    </>)
}