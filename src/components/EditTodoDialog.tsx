import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { theme } from '../theme';
import CustomButton from './CustomButton';
import { TodoInEdit } from '../types/todoInEdit';
import Toast from 'react-native-toast-message';

interface Props {
    visible: boolean;
    onEditEnd: (todo: TodoInEdit) => void;
    onClose: () => void;
    initTodo?: TodoInEdit;
}

export const EditTodoDialog = ({ visible, onClose, onEditEnd, initTodo }: Props) => {
    const [title, setTitle] = useState(initTodo?.title ?? '');
    const [description, setDescription] = useState(initTodo?.description ?? '');
    useEffect(() => {
        if (initTodo) {
            setTitle(initTodo.title);
            setDescription(initTodo.description);
        }
    }, [initTodo]);

    if (!visible) { return null; }

    const _onEditEnd = () => {
        if (initTodo) {
            if (!description || !title) {
                Toast.show({
                    type: 'error',
                    text1: 'You need to fill both fields!',
                });
                return;
            }

            onEditEnd({ id: initTodo?.id, description, title });
        }
        onClose();

    };

    return (
        <View style={styles.container}>
            <Input
                value={title}
                onChangeText={setTitle}
                inputContainerStyle={styles.noUnderline}
                style={styles.input}
                placeholder="Title"
            />
            <Input
                value={description}
                onChangeText={setDescription}
                inputContainerStyle={styles.noUnderline}
                style={styles.input}
                placeholder="Description"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
            />
            <View style={styles.buttonsContainer}>
                <CustomButton fontSize={16} color={theme.colors.primary} title="Cancel" onPress={onClose} type="outlined" width={121} height={36} />
                <CustomButton fontSize={16} color={theme.colors.primary} title="Done" onPress={_onEditEnd} type="solid" width={121} height={36} />
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
        backgroundColor: theme.colors.background,
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
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noUnderline: {
        borderBottomWidth: 0,
    },
});
