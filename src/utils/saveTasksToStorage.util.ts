import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../interfaces';


export const saveTasksToStorage = async (tasksToSave: Task[], storageKey: string) => {
    try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(tasksToSave));
    } catch (error) {
        console.error('Error saving tasks to storage', error);
    }
};
