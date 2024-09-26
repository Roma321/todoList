import { StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR } from '../../constants';
import { Button, Icon } from 'react-native-elements';
import React, { useState } from 'react';
import { AddTodoDialog } from './AddTodoDialog';

export const AddTodo = () => {
    const [addDialogActive, setAddDialogActive] = useState(false);
    return (
        <View style={styles.circleButtonContainer}>
            <AddTodoDialog visible={addDialogActive} onClose={() => setAddDialogActive(false)} />

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

