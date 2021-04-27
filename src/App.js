import { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
import Button from './components/Button/Button';
// import { ReactComponent as DeleteIcon } from './icons/delete.svg';   //импорт иконки svg как реакт компонента для вставки в кнопку
//files from db
// import initialTodos from './db/todos.json'; => заменили на локальный сервер

//Fetch files
import todosApi from './services/todosApi';

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

const style = { color: 'orange', marginLeft: 50 };

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
    showTimer: false,
  };

  componentDidMount() {
    //Работа с Locale Storage
    //парсим данные из LS
    // const savedContacts = localStorage.getItem('todos');
    // const parsedContacts = JSON.parse(savedContacts);
    // //делаем проверку на пустоту (null) и достаем данные из LS для отрисовки в рендере
    // if (parsedContacts) {
    //   this.setState({
    //     todos: parsedContacts,
    //   });
    // }

    //при рождении компонента забираем данные с сервера
    todosApi
      .fetchTodos()
      .then(todos => this.setState({ todos }))
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    //сохраняем данные в LS в проверке сравнения массивов на отличия в данных
    // if (this.state.todos !== prevState.todos) {
    //   localStorage.setItem('todos', JSON.stringify(this.state.todos));
    // }
  }

  //метод для получения данных с component Form в Арр
  // submitFormHandler = data => {
  //   console.log(data);
  // };

  //метод для добавления данных в разметку при получении данных с component TodoEditor в Арр
  addTodoBySubmit = message => {
    // console.log(message);
    const newTodo = {
      // id: uuidv4(),    //при работе с БД айдишник прийдет с бека сам и запишется в стэйт
      text: message,
      completed: false, ////при работе с БД комплитед прийдет с бека сам и запишется в стэйт
    };

    //добавление в state без БД
    // this.setState(prevState => ({
    //   todos: [...prevState.todos, newTodo],
    // }));
    todosApi.addTodoFromDb(newTodo).then(todo => {
      // console.log(response.data);

      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
      }));
    });
  };

  //метод для Удаления заметки по клику кнопки
  deleteTodo = todoId => {
    //удаление из state без БД
    // this.setState(prevState => ({
    //   todos: prevState.todos.filter(todo => todo.id !== todoId),
    // }));

    //удаление из state с БД
    todosApi.deleteTodoFromDb(todoId).then(() => {
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== todoId),
      }));
    });
  };

  //метод для Обновления массива по ID!!!!!
  toggleCompleted = todoId => {
    // console.log(todoId);
    //обновление из state без БД
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       console.log('Нашли заметку, которая нужна');
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    //второй вариант записи (более сокращенный код обновления из state без БД)
    // this.setState(({ todos }) => ({
    //   todos: todos.map(todo =>
    //     todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // }));

    //обновление из state с БД

    //костыль для локальной БД json-server
    const todo = this.state.todos.find(({ id }) => id === todoId);
    const { completed } = todo;

    todosApi
      .updateTodoFromDb(todoId, { completed: !completed })
      .then(updateTodo => {
        this.setState(({ todos }) => ({
          todos: todos.map(todo =>
            todo.id === updateTodo.id ? updateTodo : todo,
          ),
        }));
      });
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              ut rerum libero fugiat tenetur adipisci nostrum laboriosam
              voluptatem perferendis laborum molestias nam at obcaecati
              voluptatibus quia, praesentium consectetur vel debitis qui? Omnis
              impedit voluptatibus quisquam iste ab facere animi tenetur!
            </p>
            <Button onClose={this.toggleModal} />
            {/* <button type="button" className={styles.btnClose} onClick={this.toggleModal}>
              X
            </button> */}
          </Modal>
        )}
        <ColorPicker options={colorPickerOptions} />
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
          <p style={style}>Общее кол-во: {totalTodos}</p>
          <p style={style}>Кол-во выполненных: {completeTodoCount}</p>
          <p style={style}>Кол-во невыполненных: {unfulfilledTodoCount}</p>
        </div>
      </>
    );
  }
}

export default App;
