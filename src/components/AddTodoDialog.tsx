import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { LILAC_COLOR, PRIMARY_COLOR } from '../../constants';
import CustomButton from './CustomButton';
import { Todo } from '../../types/todo';
import { addTodo } from '../../api/requests/todo';

interface Props {
    visible: boolean;
    onNewItem: (item: Todo) => void;
    onClose: () => void;
}

export const AddTodoDialog = ({ visible, onClose, onNewItem }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    if (!visible) { return null; }

    const addNewTodo = () => {
        addTodo(title, description).then(newTodo => {
            onNewItem(newTodo);
            onClose();
        });
    };
    return (
        <View style={styles.container}>
            <Input
                value={title}
                onChangeText={setTitle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder="Title"
            />
            <Input
                value={description}
                onChangeText={setDescription}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
                placeholder="Description"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomButton color={PRIMARY_COLOR} title="Cancel" onPress={onClose} type="outlined" width={150} />
                <CustomButton color={PRIMARY_COLOR} title="Done" onPress={addNewTodo} type="solid" width={150} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingHorizontal: 10,
        borderRadius: 15,
        margin: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        backgroundColor: LILAC_COLOR,
        borderRadius: 8,
    },
});
