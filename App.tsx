import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Todo } from './src/types/todo';
import { getTodos } from './src/api/requests/todo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoItem } from './src/components/TodoItem';
import { Circles } from './src/components/Circles';
import { TodoInEdit } from './src/types/todoInEdit';
import Toast from 'react-native-toast-message';
import EditTodoContainer from './src/components/EditTodoContainer';
import { Text } from 'react-native-elements';

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
    setTodoInEdit({ ...todo });
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Circles />
          <Text style={styles.appHeader} >My To-Do</Text>
          <FlatList
            style={styles.list}
            data={todos}
            renderItem={({ item }) => <TodoItem onEditPressed={onEditPressed} onDelete={onDelete} onUpdate={onUpdate} todo={item} />}
          />
          <EditTodoContainer
            todoInEdit={todoInEdit}
            onUpdate={onUpdate}
            onNewItem={onNewItem}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      <Toast />
    </>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    fontSize: 19,
    marginHorizontal: 'auto',
    marginTop: 28,
    marginBottom: 34,
  },
  list: {
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginBottom: 100,
  },
});

export default App;
