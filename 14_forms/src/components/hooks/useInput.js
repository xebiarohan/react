import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlue() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    hasError: didEdit && !valueIsValid,
    handleInputChange,
    handleInputBlue,
  };
}
