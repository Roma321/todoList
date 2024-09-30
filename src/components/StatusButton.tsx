import { theme } from '../theme';
import { TodoStatus } from '../types/todoStatus';
import CustomButton from './CustomButton';
import { STATUS_TO_COLOR } from './TodoItem';
import React from 'react';

interface Props {
    todoStatus: TodoStatus,
    managingStatus: TodoStatus,
    onPress: (status: TodoStatus) => void;
    title: string;
}

export const StatusButton = ({ todoStatus, managingStatus, onPress, title }: Props) => {
    const isActive = todoStatus === managingStatus;
    const textColor = isActive ? theme.colors.background : theme.colors.textColor;
    return <CustomButton
        fontSize={14}
        textColor={textColor}
        color={STATUS_TO_COLOR[managingStatus]}
        title={title}
        onPress={() => { onPress(managingStatus); }}
        type={
            isActive ? 'solid' : 'outlined'
        }
        width={80}
        height={36}
    />;
};
