import { useTask } from '../hooks/useTask';
import { TaskContext } from './tasksContext';
import { Task } from '../interfaces';

const tasksList: Task[] = [
    { id: '111-44224-4242', description: 'Baila Zamba', isCompleted: false },
    { id: '111-44224-4243', description: 'Jugar con xPeke 🐲', isCompleted: false },
];

interface Props {
    children: React.ReactNode;
}
export const TasksProvider = ({ children }: Props) => {
    const { tasks, addTask, editTask, deleteTask, handleToggleComplete, setTasks, originalTasks } = useTask(tasksList);

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, handleToggleComplete, setTasks, originalTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
