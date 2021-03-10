import React from 'react';
import './TodoList.css';

const TodoList = ({ todos, ondeleteTodo }) => {
  // console.log(todos);
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <p className="TodoList__text">{todo.text}</p>
          <button onClick={() => ondeleteTodo(todo.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
