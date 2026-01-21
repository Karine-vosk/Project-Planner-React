import { use } from 'react';
import NewTask from './NewTask.jsx';
import { TaskContext } from '../store/task-context.jsx';

const Tasks = ({ projectId }) => {
  const { tasks, onDeleteTask } = use(TaskContext);
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <section>
      <h2 className='text-2xl font-bold text-stone-700 mb-4'>New Task</h2>
      <NewTask projectId={projectId} />
      {projectTasks.length === 0 && (
        <p className='text=stone-800 my-4'>
          This project does not have any tasks yet.
        </p>
      )}
      {projectTasks.length > 0 && (
        <ul className='p-4 mt-8 rounded-md bg-stone-100'>
          {projectTasks.map((task) => (
            <li key={task.id} className='flex justify-between my-4'>
              <span>{task.text}</span>
              <button
                className='text-stone-700 hover:text-red-500'
                onClick={() => onDeleteTask(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
