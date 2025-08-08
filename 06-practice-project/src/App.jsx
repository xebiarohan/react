import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

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
    const projectId = Math.random();
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: projectId,
        tasks: [],
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((currentProjectState) => {
      return { ...currentProjectState, selectedProjectId: undefined };
    });
  }

  function handleProjectSelection(id) {
    setProjectsState((currentProjectState) => {
      return { ...currentProjectState, selectedProjectId: id };
    });
  }

  function handleDeleteProject(id) {
    setProjectsState((currentProjectState) => {
      return {
        ...currentProjectState,
        projects: currentProjectState.projects.filter((p) => p.id !== id),
        selectedProjectId: undefined,
      };
    });
  }

  function handlerAddTask(newTask) {
    setProjectsState((currentProjectState) => {
      currentProjectState.projects.forEach((p) => {
        if (p.id === currentProjectState.selectedProjectId && p.tasks.indexOf(newTask) < 0) {
          p.tasks.push(newTask);
        }
      });
      return { ...currentProjectState, projects: [...currentProjectState.projects] };
    });
  }

  console.log(projectsState);
  let content = null;
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddingNewProject={handleAddProject}
        onCancel={handleCancelProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected
        onStartAddProject={handleStartAddProject}
      ></NoProjectSelected>
    );
  } else {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );

    if (selectedProject) {
      content = (
        <SelectedProject
          project={selectedProject}
          onDeleteProject={handleDeleteProject}
          onAddTask={handlerAddTask}
        ></SelectedProject>
      );
    }
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onProjectSelection={handleProjectSelection}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
      ></ProjectsSidebar>
      {content}
    </main>
  );
}

export default App;
