import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Todo } from './types/todo';
import { addTodo, getTodos, updateTodo as updateTodoAPI } from './src/api/requests/todo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AddTodoButton } from './src/components/AddTodoButton';
import { TodoItem } from './src/components/TodoItem';
import { Circles } from './src/components/Circles';
import { EditTodoDialog } from './src/components/EditTodoDialog';
import { TodoInEdit } from './types/todoInEdit';

function App(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInEdit, setTodoInEdit] = useState<TodoInEdit>();

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const onNewItem = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const onUpdate = (todo: Todo) => {
    const toUpdate = todos.find(it => it.id === todo.id);
    if (toUpdate) {
      Object.assign(toUpdate, todo);
      setTodos([...todos]);
    }
  };

  const onDelete = (id: number) => {
    setTodos(todos.filter(it => it.id !== id));
  };

  const onEditPressed = (todo: Todo) => {
    setTodoInEdit(todo);
  }

  const updateTodo = ({ id, title, description }: TodoInEdit) => {
    updateTodoAPI(id!, title, description).then((updatedTodo) => onUpdate(updatedTodo));
  }

  const onEditDialogEnd = (todoInEdit: TodoInEdit) => {
    if (todoInEdit.id) {
      updateTodo(todoInEdit)
    } else {
      addNewTodo(todoInEdit);
    }
  }

  const addNewTodo = ({ title, description }: TodoInEdit) => {
    addTodo(title, description).then(newTodo => {
      onNewItem(newTodo);
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Circles />
        <FlatList style={{ zIndex: 2, width: '100%', padding: 20 }} data={todos} renderItem={(todo) => <TodoItem onEditPressed={onEditPressed} onDelete={onDelete} onUpdate={onUpdate} todo={todo.item} />} />

        <View style={styles.circleButtonContainer}>
          <EditTodoDialog initTodo={todoInEdit} onEditEnd={onEditDialogEnd} visible={!!todoInEdit} onClose={() => setTodoInEdit(undefined)} />

          <AddTodoButton onPress={() => {
            return setTodoInEdit({ id: null, title: '', description: '' });
          }} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleButtonContainer: {
    position: 'absolute',
    bottom: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 5,
    width: '100%'
  },
});

export default App;
