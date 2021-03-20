import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

//Components
import Modal from './components/Modal';
import Counter from './components/Counter/Counter';
import Dropdown from './components/Dropdown/Dropdown';
import ColorPicker from './components/ColorPicker/ColorPicker';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor/TodoEditor';
import Filter from './components/Filter/Filter';
import Timer from './components/Timer';
// import Form from './components/Form/Form';

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
    filter: '',
    showModal: false,
    showTimer: false,
  };

  componentDidMount() {
    //парсим данные из LS
    const savedContacts = localStorage.getItem('todos');
    const parsedContacts = JSON.parse(savedContacts);
    //делаем проверку на пустоту (null) и достаем данные из LS для отрисовки в рендере
    if (parsedContacts) {
      this.setState({
        todos: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevState) {
    //сохраняем данные в LS в проверке сравнения массивов на отличия в данных
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }
  //метод для получения данных с component Form в Арр
  // submitFormHandler = data => {
  //   console.log(data);
  // };

  //метод для добавления данных в разметку при получении данных с component TodoEditor в Арр
  addTodoBySubmit = message => {
    // console.log(message);
    const newTodo = {
      id: uuidv4(),
      text: message,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  //метод для Удаления заметки по клику кнопки
  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  //метод для Обновления массива по ID!!!!!
  toggleCompleted = todoId => {
    // console.log(todoId);
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          console.log('Нашли заметку, которая нужна');
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));

    // this.setState(({ todos }) => ({
    //   todos: todos.map(todo =>
    //     todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // }));
  };

  //метод для получения данных для обновления фильтра
  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  //создаем методы для логики вычисляемых данных в rendere
  //метод для фильтрации массива по названию todo
  getFilteredTodos = () => {
    const { todos, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  //метод подсчета выполненных todo
  getCompletedTodoCount = () => {
    const { todos } = this.state; // деструкт свойств обекта state
    // return todos.filter(todo => todo.completed).length;   1й вариант решения

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  //метод подсчета НЕ выполненных todo
  getunfulfilledTodoCount = () => {
    const { todos } = this.state; // деструкт свойств обекта state
    // return todos.filter(todo => !todo.completed).length;   1й вариант решения

    return todos.reduce(
      (total, todo) => (!todo.completed ? total + 1 : total),
      0,
    );
  };

  //метод для закрытия и открытия модалки
  toggleModal = () => {
    this.setState(state => ({
      showModal: !this.state.showModal,
    }));
  };

  //метод для открытия и закрытия таймера
  toggleTimer = () => {
    this.setState(state => ({
      showTimer: !this.state.showTimer,
    }));
  };

  render() {
    const { todos, filter } = this.state; // деструкт свойств обекта state
    const totalTodos = todos.length;
    const completeTodoCount = this.getCompletedTodoCount();
    const unfulfilledTodoCount = this.getunfulfilledTodoCount();
    const filteredTodosByText = this.getFilteredTodos();

    return (
      <>
        {/* <Form onSubmit={this.submitFormHandler} /> */}
        <button type="button" onClick={this.toggleTimer}>
          {this.state.showTimer ? 'Скрыть время' : 'Показать время'}
        </button>
        {this.state.showTimer && <Timer />}
        <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Заголовок модалки</h1>
            <ColorPicker options={colorPickerOptions} />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              ut rerum libero fugiat tenetur adipisci nostrum laboriosam
              voluptatem perferendis laborum molestias nam at obcaecati
              voluptatibus quia, praesentium consectetur vel debitis qui? Omnis
              impedit voluptatibus quisquam iste ab facere animi tenetur!
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрыть модалку
            </button>
          </Modal>
        )}
        <Counter initialValue={0} />
        <Dropdown />

        <TodoEditor onSubmit={this.addTodoBySubmit} />
        <Filter valueFilter={filter} onChangeFilter={this.changeFilter} />
        <TodoList
          todos={filteredTodosByText} //передаем в отрисовку ТудуЛист только отфильтрованные тудушки
          ondeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
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
