import { ColorValue, StyleSheet, View } from 'react-native';
import { Todo } from '../../types/todo';
import { Text } from 'react-native-elements';
import React from 'react';
import EditIcon from '../assets/Edit.svg';
import DeleteIcon from '../assets/Delete.svg';
import { TodoStatus } from '../../types/todoStatus';
import { DONE_COLOR, PENDING_COLOR, WONT_DO_COLOR } from '../../constants';

interface Props {
    todo: Todo;
}

const STATUS_TO_COLOR: Record<TodoStatus, ColorValue> = {
    [TodoStatus.pending]: PENDING_COLOR,
    [TodoStatus.wontDo]: WONT_DO_COLOR,
    [TodoStatus.done]: DONE_COLOR,
};

export const TodoItem = ({ todo }: Props) => {
    return <View style={styles.outerContainer}>
        <View style={styles.container}>
            <View style={styles.infoBlock}>
                <View style={[styles.circle, { backgroundColor: STATUS_TO_COLOR[todo.status] }]} />
                <View>
                    <Text style={styles.title}>{todo.title}</Text>
                    <Text style={styles.description}>{todo.description}</Text>
                </View>
            </View>
            <View style={styles.icons}>
                <View style={styles.icon}>
                    <EditIcon />
                </View>
                <View style={styles.icon}>
                    <DeleteIcon />
                </View>
            </View>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginVertical: 8,
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 12,
        color: 'grey',
    },
    description: {
        fontSize: 16,
        color: 'black',
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 16,
    },
});
