import { useState, use } from 'react';
import { TaskContext } from '../store/task-context.jsx';

const NewTask = ({ projectId }) => {
  const { onAddTask } = use(TaskContext);
  const [enteredTask, setEnteredTask] = useState('');

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') {
      return;
    }
    onAddTask(enteredTask, projectId);
    setEnteredTask('');
  }

  return (
    <div className='flex items-center gap-4'>
      <input
        type='text'
        className='w-64 px-3 py-1 rounded-sm bg-stone-200'
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className='text-stone-700 hover:text-stone-950'
        onClick={handleClick}
      >
        Add task
      </button>
    </div>
  );
};

export default NewTask;
