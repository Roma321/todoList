import { TodoStatus } from '../../types/todoStatus';
import CustomButton from './CustomButton';
import { STATUS_TO_COLOR } from './TodoItem';
interface Props {
    todoStatus: TodoStatus,
    managingStatus: TodoStatus,
    onPress: (status: TodoStatus) => void;
    title: string;
}
export const StatusButton = ({ todoStatus, managingStatus, onPress, title }: Props) => {
    return <CustomButton fontSize={14} color={STATUS_TO_COLOR[managingStatus]} title={title} onPress={() => { onPress(managingStatus); }} type={
        todoStatus === managingStatus ? 'solid' : 'outlined'
    } width={80} height={36} />;
};
