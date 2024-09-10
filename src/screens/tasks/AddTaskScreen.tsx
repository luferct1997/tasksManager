import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TaskContext } from '../../context/tasksContext';
import { Button } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigator';

export const AddTaskScreen = () => {
    const { addTask } = useContext(TaskContext);
    const [inputText, setInputText] = useState('');

    const navigator = useNavigation<NavigationProp<RootStackParams>>();

    const handleAddTaskPress = () => {
        addTask(inputText);
        navigator.navigate('Tasks');
    };

    const handleGoBackPress = () => {
        navigator.navigate('Tasks');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Añadir tarea</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Add a task"
                value={inputText}
                onChangeText={setInputText}
            />
            <View style={styles.buttonsContainer}>
                <Button mode="contained" onPress={handleAddTaskPress}>Añadir Tarea</Button>
                <Button mode="outlined" onPress={handleGoBackPress}>Regresar</Button>
            </View>
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
    textInput: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 10,
    },
});
