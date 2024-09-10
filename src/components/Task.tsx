import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task as TaskInterface } from '../interfaces/task.interface';

interface Props {
    onPress: () => void;
    task: TaskInterface;
}
export const Task = ({ onPress, task: { isCompleted, description } }: Props) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={isCompleted ? 'checkbox' : 'square-outline'}
                        size={24}
                        color={isCompleted ? 'green' : 'grey'}
                    />
                    <Text style={{ marginLeft: 8 }}>{description}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    taskText: {
        marginLeft: 8,
    },
});
