import { createStackNavigator } from '@react-navigation/stack';
import { TasksScreen } from '../screens/tasks/TasksScreen';
import { AddTaskScreen } from '../screens/tasks/AddTaskScreen';
import { EditTaskScreen } from '../screens/tasks/EditTaskScreen';

export type RootStackParams = {
    Tasks: undefined;
    AddTask: undefined;
    EditTask: { id: string | number[], name: string };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerStyle: {
                elevation: 0,
                shadowColor: 'transparent',
            },
        }}>
            <Stack.Screen name="Tasks" component={TasksScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="EditTask" component={EditTaskScreen} />
        </Stack.Navigator>
    );
};
