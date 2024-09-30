import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { TodoStatus } from '../types/todoStatus';
import { STATUS_TO_COLOR } from './TodoItem';
import React from 'react';
import Svg, { Path, Text } from 'react-native-svg';

interface Props {
    todoStatus: TodoStatus,
    managingStatus: TodoStatus,
    onPress: (status: TodoStatus) => void;
    title: string;
}

const PATH = 'M0.5 18C0.5 8.93781 7.5669 1.45685 16.612 1.0873C24.2017 0.777205 33.0522 0.496065 40.1206 0.500042C47.1049 0.503971 55.8602 0.783743 63.3876 1.09091C72.4317 1.45996 79.5 8.9391 79.5 18C79.5 27.0609 72.4317 34.54 63.3876 34.9091C55.8602 35.2162 47.1049 35.496 40.1206 35.5C33.0522 35.5039 24.2017 35.2228 16.612 34.9127C7.56688 34.5431 0.5 27.0622 0.5 18Z';

export const StatusButton = ({ todoStatus, managingStatus, onPress, title }: Props) => {
    const isActive = todoStatus === managingStatus;
    const color = STATUS_TO_COLOR[managingStatus];
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => onPress(managingStatus)}>
            <Svg width={80} height={36} viewBox={'0 0 80 36'}>
                <Path
                    d={PATH}
                    fill={isActive ? color : theme.colors.background}
                    stroke={isActive ? 'transparent' : color}
                    strokeWidth={isActive ? 0 : 1}
                />
                <Text
                    x={'50%'}
                    y={'50%'}
                    alignmentBaseline="central"
                    textAnchor="middle"
                    fill={isActive ? theme.colors.background : theme.colors.textColor}
                    fontSize={14}
                >
                    {title}
                </Text>
            </Svg>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
