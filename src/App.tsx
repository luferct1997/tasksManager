import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './routes/StackNavigator';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { TasksProvider } from './context/tasksProvide';

export const App = () => {
  return (
    <PaperProvider settings={{
      icon: (props) => <IonIcon {...props} />,
    }}>
      <NavigationContainer>
        <TasksProvider>
          <StackNavigator />
        </TasksProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};
