import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/* eslint-disable react/prop-types */
function TaskCard({ task }) {

    const { deleteTask } = useTasks();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-700 hover:bg-red-500 text-white transition ease-in px-4 py-2 rounded-md" onClick={() => deleteTask(task._id)}>Delete</button>
                    <Link to={`/tasks/${task._id}`} className="bg-blue-700 hover:bg-blue-500 text-white transition ease-in px-4 py-2 rounded-md">Edit</Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
        </div>
    );
}

export default TaskCard;