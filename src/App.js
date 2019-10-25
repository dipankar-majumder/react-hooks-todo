import React, { useState } from 'react';

const InsertTodo = props => {
  const [newTodo, setNewTodo] = useState({
    id: undefined,
    todo: '',
    completed: false,
  });
  const handleInputText = e => {
    setNewTodo({
      ...newTodo,
      todo: e.target.value,
    });
  };
  return (
    <div id='InsertTodo'>
      <label>Insert Todos </label>
      <input
        type='text'
        onChange={handleInputText}
        placeholder='Enter Todos'
        autoFocus
      ></input>
      <input
        type='button'
        onClick={() => props.insertTodo(newTodo)}
        value='Add Todo'
      />
    </div>
  );
};

const Todo = props => {
  const getStyle = () => {
    return {
      textDecoration: props.todo.completed ? 'line-through' : 'none',
    };
  };
  return (
    <div id='Todo'>
      <input
        type='checkbox'
        checked={props.todo.completed}
        onChange={() => props.completeTodo(props.todo.id)}
      />
      <p style={getStyle()}>{JSON.stringify(props.todo)}</p>
      <input
        type='button'
        value='Delete'
        onClick={() => props.deleteTodo(props.todo.id)}
      />
    </div>
  );
};

const Todos = props => {
  return (
    <div id='Todos'>
      <h1>Todos</h1>
      <InsertTodo todos={props.todos} insertTodo={props.insertTodo} />
      {props.todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          completeTodo={props.completeTodo}
          deleteTodo={props.deleteTodo}
        />
      ))}
    </div>
  );
};

const App = props => {
  const [todos, setTodos] = useState([]);
  const insertTodo = newTodo => {
    setTodos([...todos, { ...newTodo, id: new Date().getTime() }]);
  };
  const completeTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    );
  };
  const deleteTodo = id => {
    setTodos([...todos.filter(todo => id !== todo.id)]);
  };
  return (
    <div id='App'>
      <Todos
        todos={todos}
        insertTodo={insertTodo}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
