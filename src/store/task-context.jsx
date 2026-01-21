import { createContext, useReducer, useState } from 'react';

export const TaskContext = createContext({
  tasks: [],
  onDeleteTask: () => {},
  onAddTask: () => {},
});

function TaskContextReducer(state, action) {
  if (action.type === 'ADD_TASK') {
    const tasks = [
      {
        id: Math.random(),
        text: action.payload.text,
        projectId: action.payload.projectId,
      },
      ...state.tasks,
    ];

    return {
      tasks,
    };
  }

  if (action.type === 'DELETE_TASK') {
    return {
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    };
  }

  return state;
}

export default function TaskContextProvider({ children }) {
  const [tasksState, tasksStateDispatch] = useReducer(TaskContextReducer, {
    tasks: [],
  });

  function handleAddTask(text, projectId) {
    tasksStateDispatch({
      type: 'ADD_TASK',
      payload: {
        text,
        projectId,
      },
    });
  }

  function handleDeleteTask(id) {
    tasksStateDispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  }

  const ctxValue = {
    tasks: tasksState.tasks,
    onDeleteTask: handleDeleteTask,
    onAddTask: handleAddTask,
  };

  return (
    <TaskContext.Provider value={ctxValue}>{children}</TaskContext.Provider>
  );
}
