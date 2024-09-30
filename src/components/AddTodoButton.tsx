import { Keyboard, Platform, StyleSheet } from 'react-native';
import { theme } from '../theme';
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

        const hideSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
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
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
});

