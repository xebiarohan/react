import { useRef, useState } from "react";

export default function NewTask({ onAddTask }) {

  const [enteredTask, setEnteredTask] = useState('');

  function handleAddTask() {
    onAddTask(enteredTask);
    setEnteredTask('');
  }

  function handleInputValue(event) {
    setEnteredTask(event.target.value);
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        onChange={handleInputValue}
        value={enteredTask}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddTask}
      >
        Add task
      </button>
    </div>
  );
}
