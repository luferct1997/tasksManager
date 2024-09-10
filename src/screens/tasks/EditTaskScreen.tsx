import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TaskContext } from '../../context/tasksContext';
import { Button } from 'react-native-paper';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigator';

export const EditTaskScreen = () => {
    const { id, name } = useRoute<RouteProp<RootStackParams, 'EditTask'>>().params;

    const [inputText, setInputText] = useState(name);

    const { editTask } = useContext(TaskContext);

    const navigator = useNavigation<NavigationProp<RootStackParams>>();

    const handleEditTaskPress = () => {
        editTask(id, inputText);
        navigator.navigate('Tasks');
    };

    const handleGoBackPress = () => {
        navigator.navigate('Tasks');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar tarea</Text>
            <TextInput
                style={styles.textInput}
                placeholder="ingresa una tarea"
                value={inputText}
                onChangeText={setInputText}
            />
            <View style={styles.buttonsContainer}>
                <Button mode="contained" onPress={handleEditTaskPress}>Añadir Tarea</Button>
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
