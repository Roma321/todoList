import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR } from '../../constants';
import { Button, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { EditTodoDialog } from './EditTodoDialog';
import { Todo } from '../../types/todo';
import { addTodo } from '../../api/requests/todo';

interface Props {
    onNewItem: (item: Todo) => void;
}

export const AddTodo = ({ onNewItem }: Props) => {
    const [addDialogActive, setAddDialogActive] = useState(false);
    const [hideAddButton, setHideAddButton] = useState(false);

    const addNewTodo = (title: string, description: string) => {
        addTodo(title, description).then(newTodo => {
            onNewItem(newTodo);
        });
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => {
            if (addDialogActive) {
                setHideAddButton(true);
            }
        });

        const hideSubscription = Keyboard.addListener(Platform.OS == 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
            setHideAddButton(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [addDialogActive]);

    return (
            <><EditTodoDialog onEditEnd={addNewTodo} visible={addDialogActive} onClose={() => setAddDialogActive(false)} />
                {!hideAddButton && <Button
                    title=""
                    buttonStyle={styles.circleButton}
                    onPress={() => setAddDialogActive(true)}
                    icon={
                        <Icon
                            name="add"
                            type="material"
                            size={32}
                            color="white"
                        />
                    }
                />}
            </>
    );
};

const styles = StyleSheet.create({
    circleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

