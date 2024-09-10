import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, FAB, Searchbar } from 'react-native-paper';
import { RootStackParams } from '../../routes/StackNavigator';
import { Task } from '../../components/Task';
import { TaskContext } from '../../context/tasksContext';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const TasksScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [progressState, setProgressState] = useState('all');
    const { tasks, handleToggleComplete, deleteTask, originalTasks, setTasks } = useContext(TaskContext);
    const navigator = useNavigation<NavigationProp<RootStackParams>>();

    const handleChangeProgressStatePress = (state: string) => {
        setProgressState(state);
        if (state === 'all') {
            setTasks(originalTasks.current);
        }
        if (state === 'completed') {
            setTasks(originalTasks.current.filter(task => task.isCompleted === true));
        }
        if (state === 'incomplete') {
            setTasks(originalTasks.current.filter(task => !task.isCompleted));
        }
    };

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        const cleanedText = text.toLowerCase();
        if (progressState === 'completed') {
            const newTasks = originalTasks.current.filter(task => task.description.toLowerCase().includes(cleanedText) && task.isCompleted);
            return setTasks(newTasks);
        }
        if (progressState === 'incomplete') {
            const newTasks = originalTasks.current.filter(task => task.description.toLowerCase().includes(cleanedText) && !task.isCompleted);
            return setTasks(newTasks);
        }
        const newTasks = originalTasks.current.filter(task => task.description.toLowerCase().includes(cleanedText));
        setTasks(newTasks);

    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis tareas</Text>
            <Searchbar
                value={searchText}
                onChangeText={handleSearchChange}
                icon="search"
                clearIcon="close"
                placeholder="ingresa algo ..."
            />
            <View style={styles.buttonContainer}>
                <Button onPress={() => handleChangeProgressStatePress('all')} mode={progressState === 'all' ? 'contained-tonal' : 'outlined'}>Todos</Button>
                <Button onPress={() => handleChangeProgressStatePress('incomplete')} mode={progressState === 'incomplete' ? 'contained-tonal' : 'outlined'}>Por Hacer</Button>
                <Button onPress={() => handleChangeProgressStatePress('completed')} mode={progressState === 'completed' ? 'contained-tonal' : 'outlined'}>Terminada</Button>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskList}>
                        <Task task={item} onPress={() => handleToggleComplete(item.id as string)} />
                        <Ionicons name="create-outline" size={24} color="black" onPress={() => navigator.navigate('EditTask', { id: item.id, name: item.description })} />
                        <Ionicons name="trash-outline" size={24} color="black" onPress={() => deleteTask(item.id)} />
                    </View>
                )}
            />
            <FAB
                style={styles.addButton}
                onPress={() => navigator.navigate('AddTask')}
                icon="add"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'black',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    taskList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
        gap: 10,
    },
});
