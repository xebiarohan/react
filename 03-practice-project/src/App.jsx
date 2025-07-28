import UserInput from './components/UserInput';

const INPUTS = [
  {title: 'INITIAL INVESTMENT', value: 0},
  {title:'ANNUAL INVESTMENT', value: 0},
  {title: 'EXPECTED RETURN',value: 0},
  {title: 'DURATION', value: 0}
]


function App() {
  return (
    <>
    <UserInput />
    </>
    
  )
}

export default App
