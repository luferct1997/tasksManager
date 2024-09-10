import { createContext } from 'react';
import { Task } from '../interfaces';

interface ITaskContext {
    tasks: Task[];
    originalTasks: React.MutableRefObject<Task[]>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleToggleComplete: (id: string) => void;
    addTask: (description: string) => void;
    deleteTask: (id: string | number[]) => void;
    editTask: (id: string | number[], description: string) => void;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);
