/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if(!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {

    const [tasks, setTask] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTask(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async (task) => {

        try {
            const res = await createTaskRequest(task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status === 204) setTask(tasks.filter(tasks => tasks._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task)
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            getTask,
            updateTask,
            deleteTask
        }}>
            { children }
        </TaskContext.Provider>
    );
}