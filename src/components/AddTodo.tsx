import { StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR } from '../../constants';
import { Button, Icon } from 'react-native-elements';
import React, { useState } from 'react';
import { AddTodoDialog } from './AddTodoDialog';
import { Todo } from '../../types/todo';

interface Props {
    onNewItem: (item: Todo) => void;
}

export const AddTodo = ({ onNewItem }: Props) => {
    const [addDialogActive, setAddDialogActive] = useState(false);
    return (
        <View style={styles.circleButtonContainer}>
            <AddTodoDialog onNewItem={onNewItem} visible={addDialogActive} onClose={() => setAddDialogActive(false)} />

            <Button
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
            />
        </View>
    );
};

const styles = StyleSheet.create({
    circleButtonContainer: {
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 3,
    },
    circleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

