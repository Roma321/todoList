import { ColorValue, StyleSheet, View } from 'react-native';
import { Todo } from '../../types/todo';
import { Text } from 'react-native-elements';
import React from 'react';
import EditIcon from '../assets/Edit.svg';
import DeleteIcon from '../assets/Delete.svg';
import { TodoStatus } from '../../types/todoStatus';
import { DONE_COLOR, PENDING_COLOR, WONT_DO_COLOR } from '../../constants';
import { StatusButton } from './StatusButton';
import { updateTodoStatus, deleteTodo as deleteTodoAPI } from '../../api/requests/todo';

interface Props {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: (id: number) => void;
}

export const STATUS_TO_COLOR: Record<TodoStatus, ColorValue> = {
    [TodoStatus.pending]: PENDING_COLOR,
    [TodoStatus.wontDo]: WONT_DO_COLOR,
    [TodoStatus.done]: DONE_COLOR,
};

export const TodoItem = ({ todo, onUpdate, onDelete }: Props) => {

    const updateStatus = (status: TodoStatus) => {
        updateTodoStatus(todo.id, status).then(onUpdate);
    };

    const deleteTodo = () => {
        deleteTodoAPI(todo.id).then(() => onDelete(todo.id));
    };
    return <View style={styles.outerContainer}>
        <View style={styles.container}>
            <View style={styles.mainRow}>
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
                        <DeleteIcon onPress={deleteTodo} />
                    </View>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <StatusButton onPress={updateStatus} todoStatus={todo.status} managingStatus={TodoStatus.pending} title="Pending" />
                <StatusButton onPress={updateStatus} todoStatus={todo.status} managingStatus={TodoStatus.done} title="Done" />
                <StatusButton onPress={updateStatus} todoStatus={todo.status} managingStatus={TodoStatus.wontDo} title="Won't do" />
            </View>
            {/* <View style={{ position: 'absolute' }}>
                <Text>000000000000000000000000000000000</Text>
            </View> */}
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
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 6,
        paddingRight: 8,
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
        color: 'grey',
    },
    description: {
        fontSize: 14,
        color: 'black',
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
    },
});
