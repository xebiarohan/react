import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((currentProjectState) => {
      return { ...currentProjectState, selectedProjectId: null };
    });
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random()
    };

    console.log(newProject);
    setProjectsState(prevState => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAddingNewProject={handleAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected
        onStartAddProject={handleStartAddProject}
      ></NoProjectSelected>
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
      ></ProjectsSidebar>
      {content}
    </main>
  );
}

export default App;
