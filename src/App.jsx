import { useState } from 'react';

import NewProject from './components/NewProject';
import ProjectsSidebar from './components/ProjectsSidebar';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    const taskId = Math.random();
    setProjectState((prevState) => {
      const newTask = {
        text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function cancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onDeleteTask={handleDeleteTask}
      onAddTask={handleAddTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={cancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartAddProject} />;
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar
        onAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
