import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR } from '../../constants';
import { Button, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';

interface Props {
    onPress: () => void;
}

export const AddTodoButton = ({ onPress }: Props) => {
    const [hideAddButton, setHideAddButton] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => {
            setHideAddButton(true);
        });

        const hideSubscription = Keyboard.addListener(Platform.OS == 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
            setHideAddButton(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    if (hideAddButton) {
        return null;
    }

    return (
        <Button
            title=""
            buttonStyle={styles.circleButton}
            onPress={onPress}
            icon={
                <Icon
                    name="add"
                    type="material"
                    size={32}
                    color="white"
                />
            }
        />
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

