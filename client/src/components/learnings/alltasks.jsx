import { useSelector, useDispatch } from 'react-redux';
import { useState, useContext } from 'react';
import Addtask from './addtask';
import { AddtaskContext } from '../../context/contextapi';
import { deleteTodo, markTodo } from '../../features/chat/todo';
import { edittaskContext } from '../../context/contextapi';
import Editask from './edittask';

const Alltasks = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const tasktodo = todos.todos;
    const setTaskadd = useContext(AddtaskContext);
    const setEdittask = useContext(edittaskContext);
    const [edit, setEdit] = useState(null);
    const [filter, setFilter] = useState('');

    // Function to calculate days left
    const calculateDaysLeft = (taskDate) => {
        const today = new Date();
        const dueDate = new Date(taskDate);
        const timeDiff = dueDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysLeft;
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleEdit = (todo) => {
        setEdittask.setEdittask(true);
        setEdit(todo);
    };

    const markdone = (todo) => {
        const updatedTodo = { ...todo, completed: true };
        dispatch(markTodo(updatedTodo));
    };


    const handleAddNewTask = () => {
        setTaskadd.setTaskadd(true);
    };

    // Filter tasks based on label
    const filteredTasks = tasktodo.filter((todo) => {
        if (filter === 'all' || filter === '') return true; // Show all tasks
        if (filter === 'done') return todo.completed === true; // Show only completed tasks
        return false; // Fallback for undefined filters
    });



    return (
        <div className="p-6">
            <div className="flex justify-start space-x-4 mb-6">
                <div className="flex justify-start space-x-4 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded ${filter === 'all' || filter === '' ? 'bg-primary text-bg' : 'bg-gray-200 text-gray-800'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('done')}
                        className={`px-4 py-2 rounded ${filter === 'done' ? 'bg-primary text-bg' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Done
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((todo) => (
                        <div key={todo.id} className={`bg-bg rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-lg ${todo.completed ? 'bg-green-100' : ''}`}>
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className={`text-xl font-semibold text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                        {todo.title}
                                    </h2>
                                    <p className={`text-gray-600 mt-2 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                        {calculateDaysLeft(todo.date) > 0 ? `${calculateDaysLeft(todo.date)} days left` : 'Deadline passed'}
                                    </p>
                                </div>
                                <p className={`text-gray-600 ${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.desciption}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="text-bg bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    className={` ${todo.label === 'done' ? 'bg-green-500 hover:bg-green-500' : "bg-primary"} text-bg  hover:bg-primary py-1 rounded px-3 duration-300`}
                                    onClick={() => markdone(todo)}
                                >
                                    {todo.label === 'all' ? "Mark Done" : " Completed"}
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="text-bg bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">No tasks available</p>
                )}
                <div
                    onClick={handleAddNewTask}
                    className={`bg-bg rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg items-center justify-center ${setTaskadd.taskadd ? 'hidden' : 'flex'} `}
                >
                    <div className="text-center">
                        <span className="text-4xl text-gray-600">+</span>
                        <p className="mt-2 text-gray-600 font-semibold">Add New Task</p>
                    </div>
                </div>

                <div className={`z-30 top-48 left-[50%] ${setTaskadd.taskadd ? 'fixed' : 'hidden'} `}>
                    <Addtask />
                </div>

                <div className={`z-30 top-48 left-[50%] fixed`}>
                    {edit && <Editask edit={edit} />}
                </div>
            </div>
        </div>
    );
};

export default Alltasks;
