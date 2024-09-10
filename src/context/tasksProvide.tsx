import { useTask } from '../hooks/useTask';
import { TaskContext } from './tasksContext';
import { Task } from '../interfaces';

const tasksList: Task[] = [
    { id: '111-44224-4242', description: 'Ir a clases de danza con nataniel en la tarde', isCompleted: false },
    { id: '111-44224-4243', description: 'Jugar con futbol con amigos', isCompleted: false },
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
