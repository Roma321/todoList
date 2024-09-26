import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Todo } from './types/todo';
import { getTodos } from './api/requests/todo';

function App(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then(setTodos);
  }, []);


  return (
    <SafeAreaView />
  );
}

export default App;
