import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Todo } from './types/todo';
import { getTodos } from './api/requests/todo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LILAC_COLOR, PRIMARY_COLOR } from './constants';
import { RadialGradientCircle } from './src/components/RadialGradientCircle';
import { AddTodo } from './src/components/AddTodo';
import { TodoItem } from './src/components/TodoItem';

function App(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const onNewItem = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList style={{ zIndex: 2, width: '100%', padding: 20 }} data={todos} renderItem={(todo) => <TodoItem todo={todo.item} />} />
        <RadialGradientCircle
          color={'#e1dca2'}
          radius={250}
          top={120}
          right={0}
        />
        <RadialGradientCircle
          color={'#bff7ff'}
          radius={200}
          top={450}
          left={0}
        />
        <RadialGradientCircle
          color={LILAC_COLOR}
          radius={250}
          top={150}
          left={150}
        />
        <AddTodo onNewItem={onNewItem} />
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
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
