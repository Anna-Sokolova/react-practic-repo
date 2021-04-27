import React from 'react';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import IconButton from '../IconButton';
import './TodoList.css';

const TodoList = ({ todos, ondeleteTodo, onToggleCompleted }) => {
  console.log(todos);

  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <input
            type="checkbox"
            className="TodoList__checkbox"
            checked={todo.completed}
            onChange={() => onToggleCompleted(todo.id)}
          />
          <p
            className={
              todo.completed
                ? 'TodoList__text TodoList__text--completed'
                : 'TodoList__text'
            }
          >
            {todo.text}
          </p>
          {/* <button
            type="button"
            className="TodoList__btn"
            onClick={() => ondeleteTodo(todo.id)}
          >
            Удалить
          </button> */}
          <IconButton
            onClick={() => ondeleteTodo(todo.id)}
            aria-label="Delete Todo"
          >
            <DeleteIcon width="30" height="30" />
          </IconButton>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
