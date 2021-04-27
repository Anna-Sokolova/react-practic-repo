import axios from 'axios';

//базовый url выносим в дефолтное свойство либы аксиос
axios.defaults.baseURL = 'http://localhost:3000';

//вся логика HTTP-запросов в этом файле

const fetchTodos = () => {
  return axios.get('/todos').then(response => response.data);
};

const addTodoFromDb = todo => {
  return axios.post('/todos', todo).then(({ data }) => data);
};

const deleteTodoFromDb = todoId => {
  return axios.delete(`/todos/${todoId}`);
};

const updateTodoFromDb = (todoId, update) => {
  return axios.patch(`/todos/${todoId}`, update).then(({ data }) => data);
};

export default { fetchTodos, addTodoFromDb, deleteTodoFromDb, updateTodoFromDb };