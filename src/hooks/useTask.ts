import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Task } from '../interfaces';
import { saveTasksToStorage } from '../utils';

const STORAGE_KEY = 'tasks';

export const useTask = (initialTasks: Task[]) => {
    const [tasks, setTasks] = useState(initialTasks);
    const originalTasks = useRef<Task[]>(initialTasks);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    const parsedTasks = JSON.parse(storedTasks);
                    setTasks(parsedTasks);
                    originalTasks.current = parsedTasks;
                }
            } catch (error) {
                console.error('Error getting tasks from storage', error);
            }
        };
        getTasks();
    }, []);

    const handleToggleComplete = (id: string | number[]) => {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task);
        setTasks(updatedTasks);
        originalTasks.current = updatedTasks;
        saveTasksToStorage(updatedTasks, STORAGE_KEY);
    };

    const addTask = async (description: string) => {
        const newTask: Task = {
            id: uuid.v4(),
            description,
            isCompleted: false,
        };

        const updateTasks = [...tasks, newTask];

        setTasks(updateTasks);
        originalTasks.current = updateTasks;
        saveTasksToStorage(updateTasks, STORAGE_KEY);

    };

    const deleteTask = (id: string | number[]) => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que deseas eliminar este elemento?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const updatedTasks = tasks.filter(task => task.id !== id);
                        setTasks(updatedTasks);
                        originalTasks.current = updatedTasks;
                        saveTasksToStorage(updatedTasks, STORAGE_KEY);
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const editTask = (id: string | number[], description: string) => {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, description } : task);
        setTasks(updatedTasks);
        originalTasks.current = updatedTasks;
        saveTasksToStorage(updatedTasks, STORAGE_KEY);
    };

    return {
        // variables
        tasks,
        setTasks,
        originalTasks,

        // methods
        handleToggleComplete,
        addTask,
        deleteTask,
        editTask,
    };
};
