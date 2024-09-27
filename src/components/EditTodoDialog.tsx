import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { LILAC_COLOR, PRIMARY_COLOR } from '../../constants';
import CustomButton from './CustomButton';
import { Todo } from '../../types/todo';

interface Props {
    visible: boolean;
    onEditEnd: (title: string, description: string) => void;
    onClose: () => void;
    initTodo?: Todo;
}

export const EditTodoDialog = ({ visible, onClose, onEditEnd, initTodo }: Props) => {
    const [title, setTitle] = useState(initTodo?.title ?? '');
    const [description, setDescription] = useState(initTodo?.description ?? '');

    if (!visible) { return null; }

    const _onEditEnd = () => {
        onEditEnd(title, description);
        onClose();
    };
    
    return (
        <View style={styles.container}>
            <Input
                value={title}
                onChangeText={setTitle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
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
                <CustomButton fontSize={16} color={PRIMARY_COLOR} title="Cancel" onPress={onClose} type="outlined" width={121} height={36} />
                <CustomButton fontSize={16} color={PRIMARY_COLOR} title="Done" onPress={_onEditEnd} type="solid" width={121} height={36} />
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
