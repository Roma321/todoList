import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { EditTodoDialog } from './EditTodoDialog';
import { AddTodoButton } from './AddTodoButton';
import { TodoInEdit } from '../types/todoInEdit';
import { updateTodo as updateTodoAPI, addTodo } from '../api/requests/todo';

interface Props {
    todoInEdit: TodoInEdit | undefined;
    onUpdate: (todo: any) => void;
    onNewItem: (todo: any) => void;
}

const EditTodoContainer = ({
    todoInEdit,
    onUpdate,
    onNewItem,
}: Props) => {

    const [innerTodoInEdit, setInnerTodoInEdit] = useState<TodoInEdit | undefined>(todoInEdit);

    useEffect(() => {
        setInnerTodoInEdit(todoInEdit);
    }, [todoInEdit]);

    const updateTodo = ({ id, title, description }: TodoInEdit) => {
        updateTodoAPI(id!, title, description).then((updatedTodo) => onUpdate(updatedTodo));
    };

    const onEditDialogEnd = (_todoInEdit: TodoInEdit) => {
        if (_todoInEdit.id) {
            updateTodo(_todoInEdit);
        } else {
            addNewTodo(_todoInEdit);
        }
    };

    const addNewTodo = ({ title, description }: TodoInEdit) => {
        addTodo(title, description).then((newTodo) => {
            onNewItem(newTodo);
        });
    };

    return (
        <View style={styles.circleButtonContainer}>
            <EditTodoDialog
                initTodo={innerTodoInEdit}
                onEditEnd={onEditDialogEnd}
                visible={!!innerTodoInEdit}
                onClose={() => { setInnerTodoInEdit(undefined); }}
            />

            <AddTodoButton
                onPress={() => {
                    setInnerTodoInEdit({ id: null, title: '', description: '' });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    circleButtonContainer: {
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 3,
        width: '100%',
    },
});

export default EditTodoContainer;
