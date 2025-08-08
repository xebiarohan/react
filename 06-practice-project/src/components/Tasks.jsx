import NewTask from "./NewTask.jsx";

export default function Tasks({ project, onAddTask }) {

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAddTask={onAddTask}></NewTask>
      {project.tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any task yet
        </p>
      )}

      <ul>
        {project.tasks.map((task, index) => {
          return <li key={task}>{task}</li>;
        })}
      </ul>
    </section>
  );
}
