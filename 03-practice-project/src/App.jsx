import { useState } from "react";
import UserInput from "./components/UserInput";
import Result from "./components/Result";


function App() {
  const [userInputs, setUserInputs] = useState({
    initialInvestment: 10000,
    annualInvestment: 1000,
    expectedReturn: 5,
    duration: 10,
  });

  function onInputChange(inputIdentifier, newValue) {
    setUserInputs((currentInputs) => {
      return { ...currentInputs, [inputIdentifier]: +newValue };
    });
  }

  return (
    <>
      <UserInput userInputs={userInputs} onInputChange={onInputChange} />
      <Result userInputs={userInputs} />
    </>
  );
}

export default App;
