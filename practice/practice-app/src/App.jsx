import { useRef, useState } from 'react';
import './App.css'
import reactImage from './assets/react.svg';
import Names from './components/Names';
import NamesContext from './store/NamesContext';
import AddNames from './components/AddNames';
import DisplayNames from './components/DisplayNames';
import Counter from './components/Counter';

function App() {

  let names = ['Rohan', 'Riddhi'];
  const [members, setMembers] = useState(names);
  const [showNames, setShowNames] = useState(false);
  const [realNames, setRealNames] = useState([]);
  
  const header = <h2>Family members</h2>
  let timerRef = useRef();
  let nameRef = useRef();

  function handleTimerStart() {
    timerRef.current = setTimeout(()=> {
        console.log('someting');
    },2000);
  }

  function cancelTimer() {
    clearTimeout(timerRef.current);
  }

  function addName() {
    if(members.length <3) {
    setMembers((members) => {
          return [...members, 'Ruhi']
        });
    }
    
  }

  function toggleDisplayName() {
    setShowNames((previousValue) => !previousValue);
  }

  function showName() {
    console.log(nameRef.current.value);
  }

  function addNewRealName(newName) {
    setRealNames(prevNames => {
      const newRealNames = [...prevNames];
      newRealNames.push(newName);
      return newRealNames;
    })
  }

  const context = {
    names: realNames,
    updateNames: (name) => addNewRealName(name)
  }

  return (
    <>
      {header}
      {members.map(name => <Names key={name} name={name} showNames={showNames} TextContainer='p' ref={nameRef}>Aggarwal</Names>)}
      <img src={reactImage}></img>
      <button onClick={() => addName()}>Add Member</button>
      <button onClick={() => toggleDisplayName()}>Toddle Diplay Names</button>
      <button onClick={showName}>Show New Name</button>

      <NamesContext.Provider value={context}>
        <AddNames></AddNames>
        <DisplayNames></DisplayNames>
      </NamesContext.Provider>
      <Counter></Counter>
    </>
  )
}

export default App
