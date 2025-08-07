import Input from "./Input.jsx";
import { useRef } from "react";

export default function NewProject({ onAddingNewProject }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  function handleSaveProject() {
    const newProject = {
      title: titleRef.current.getValue(),
      description: descriptionRef.current.getValue(),
      dueDate: dueDateRef.current.getValue(),
    };

    onAddingNewProject(newProject);
  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSaveProject}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input label="Title" ref={titleRef} />
        <Input label="Description" textarea ref={descriptionRef} />
        <Input label="Due Date" ref={dueDateRef} />
      </div>
    </div>
  );
}
