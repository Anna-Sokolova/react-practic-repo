//Components
import { Component } from 'react';
import Counter from './components/Counter/Counter';
import Dropdown from './components/Dropdown/Dropdown';
import ColorPicker from './components/ColorPicker/ColorPicker';
import TodoList from './components/TodoList';
import Form from './components/Form/Form';

//files from db
import initialTodos from './db/todos.json';

//Styles
import './App.css';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  submitFormHandler = data => {
    console.log(data);
  };

  render() {
    const { todos } = this.state; // деструкт свойств обекта state
    const totalTodos = todos.length;
    // const completeTodo = todos.filter(todo => todo.completed).length;
    const completeTodoCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
    const unfulfilledTodoCount = todos.reduce(
      (total, todo) => (!todo.completed ? total + 1 : total),
      0,
    );

    return (
      <>
        <Form onSubmit={this.submitFormHandler} />

        <Counter initialValue={0} />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} />

        <TodoList todos={todos} ondeleteTodo={this.deleteTodo} />
        <div>
          <p>Общее кол-во: {totalTodos}</p>
          <p>Кол-во выполненных: {completeTodoCount}</p>
          <p>Кол-во невыполненных: {unfulfilledTodoCount}</p>
        </div>
      </>
    );
  }
}

export default App;
