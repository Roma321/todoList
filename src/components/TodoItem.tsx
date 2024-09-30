import { ColorValue, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Todo } from '../types/todo';
import { Text } from 'react-native-elements';
import React, { useState } from 'react';
import EditIcon from '../assets/Edit.svg';
import DeleteIcon from '../assets/Delete.svg';
import { TodoStatus } from '../types/todoStatus';
import { theme } from '../theme';
import { StatusButton } from './StatusButton';
import { updateTodoStatus, deleteTodo as deleteTodoAPI } from '../api/requests/todo';

interface Props {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: (id: number) => void;
    onEditPressed: (todo: Todo) => void;
}

export const STATUS_TO_COLOR: Record<TodoStatus, ColorValue> = {
    [TodoStatus.pending]: theme.colors.pending,
    [TodoStatus.wontDo]: theme.colors['wont-do'],
    [TodoStatus.done]: theme.colors.done,
};

export const TodoItem = ({ todo, onUpdate, onDelete, onEditPressed }: Props) => {

    const [buttonRowVisible, setButtonRowVisible] = useState(false);

    const updateStatus = (status: TodoStatus) => {
        updateTodoStatus(todo.id, status).then(onUpdate);
    };

    const deleteTodo = () => {
        deleteTodoAPI(todo.id).then(() => onDelete(todo.id));
    };

    const toggleButtonRowVisible = () => {
        setButtonRowVisible(!buttonRowVisible);
    };

    return <View style={styles.outerContainer}>
        <TouchableOpacity style={styles.container} onPress={toggleButtonRowVisible}>
            <View style={styles.mainRow}>
                <View style={styles.infoBlock}>
                    <View style={[styles.circle, { backgroundColor: STATUS_TO_COLOR[todo.status] }]} />
                    <View style={styles.infoRow}>
                        <Text style={styles.title}>{todo.title}</Text>
                        <Text style={styles.description}>{todo.description}</Text>
                    </View>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => onEditPressed(todo)} style={styles.icon}>
                        <EditIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteTodo} style={styles.icon}>
                        <DeleteIcon />
                    </TouchableOpacity>
                </View>
            </View>
            {buttonRowVisible && <View style={styles.buttonRow}>
                <StatusButton onPress={updateStatus} todoStatus={todo.status} managingStatus={TodoStatus.pending} title="Pending" />
                <StatusButton onPress={updateStatus} todoStatus={todo.status} managingStatus={TodoStatus.done} title="Done" />
                <StatusButton onPress={updateStatus} todoStatus={todo.status} managingStatus={TodoStatus.wontDo} title="Won't do" />
            </View>}
        </TouchableOpacity>
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
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        elevation: 1,
        padding: 8,
        shadowColor: theme.colors.textColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginVertical: 8,
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 16,
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 6,
        paddingRight: 8,
    },
    infoRow: {
        paddingVertical: 8,
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 9,
        color: theme.colors.lightTextColor,
    },
    description: {
        fontSize: 14,
        color: theme.colors.textColor,
    },
    icons: {
        flexDirection: 'row',
        flex: 2,
        marginLeft: 8,
    },
    icon: {
        marginLeft: 16,
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        paddingHorizontal: 8,
        paddingBottom: 12,
    },
});
