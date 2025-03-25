import { useDispatch } from 'react-redux';
import { editTodo } from '../../features/chat/todo';
import { useState, useEffect } from 'react';
import { edittaskContext } from '../../context/contextapi';
import { useContext } from 'react';
const Edittask = (props) => {

  const dispatch = useDispatch();

  const [tasktodo, setTasktodo] = useState({
    id: '',
    name: '',
    description: '',
    date: '',
    label: ''
  });

  const edittask = useContext(edittaskContext);

  useEffect(() => {
    if (props.edit) {
      setTasktodo({
        id: props.edit.id,
        name: props.edit.title,
        description: props.edit.desciption,
        date: props.edit.date,
        label: ''
      });
    }
  }, [props.edit]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasktodo((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };
  const todosubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo(tasktodo));
    setTasktodo({ name: '', description: '', date: '', label: '' });
    edittask.setEdittask(false);
  };

  return (
    <>
      {edittask.edittask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold text-2xl">Edit task</h1>
              <button
                className="text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => edittask.setEdittask(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={todosubmit}>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-600">Task Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tasktodo.name}
                    onChange={handleChange}
                    className="mt-2 p-2 border rounded-lg w-full"
                    placeholder="Enter task name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Task Description</label>
                  <textarea
                    name="description"
                    value={tasktodo.description}
                    onChange={handleChange}
                    cols="30"
                    rows="5"
                    className="mt-2 p-2 border rounded-lg w-full"
                    placeholder="Enter task description"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-600">Deadline</label>
                  <input
                    type="date"
                    name="date"
                    value={tasktodo.date}
                    onChange={handleChange}
                    className="mt-2 p-2 border rounded-lg w-full"
                    required
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-primary/80 text-white p-2 rounded-lg">
                    Edit Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edittask;
