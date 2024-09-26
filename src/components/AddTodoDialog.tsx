import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { LILAC_COLOR } from '../../constants';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const AddTodoDialog = ({ visible, onClose }: Props) => {
    if (!visible) {return null;}

    return (
        <View style={styles.container}>
            <Input
                inputContainerStyle={{ borderBottomWidth: 0 }}
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder="Title"
            />
            <Input
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
                placeholder="Description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingHorizontal: 10,
        borderRadius: 15,
        margin: 20,
        paddingTop: 20,
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
