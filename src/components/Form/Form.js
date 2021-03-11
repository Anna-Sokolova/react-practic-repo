import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
// console.log(id);

class Form extends Component {
  state = {
    name: '',
    account: '',
    experience: '',
    licence: false,
  };

  //Обработчик на ввод данных в инпут и радиокнопки
  handleChange = event => {
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.name);
    // console.log(event.currentTarget.value);
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  //Обработчик на отправку всей формы по сабмиту
  handleSumit = event => {
    event.preventDefault();
    // console.log(this.props.onSubmit(this.state));
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  //Обработчик чекбокса
  handleLinenceChange = event => {
    // console.log(event.currentTarget.checked);
    this.setState({ licence: event.currentTarget.checked });
  };

  //очистка полей формы после отправки
  reset = () => {
    this.setState({ name: '', account: '', experience: 'junior' });
  };

  //генерация уникальных айдишников для связки инпута и лейбла
  nameId = uuidv4();
  accountId = uuidv4();

  render() {
    return (
      <>
        <form onSubmit={this.handleSumit}>
          <label htmlFor={this.nameId}>Имя</label>
          <input
            id={this.nameId}
            type="text"
            name="name"
            value={this.state.name.trim()}
            onChange={this.handleChange}
          />

          <label htmlFor={this.accountId}>Account</label>
          <input
            id={this.accountId}
            type="text"
            name="account"
            value={this.state.account.trim()}
            onChange={this.handleChange}
          />
          <label>
            <input
              type="radio"
              name="experience"
              value="junior"
              onChange={this.handleChange}
              checked={this.state.experience === 'junior'}
            />{' '}
            Junior
          </label>

          <label>
            <input
              type="radio"
              name="experience"
              value="middle"
              onChange={this.handleChange}
              checked={this.state.experience === 'middle'}
            />{' '}
            Middle
          </label>

          <label>
            <input
              type="radio"
              name="experience"
              value="senior"
              onChange={this.handleChange}
              checked={this.state.experience === 'senior'}
            />{' '}
            Senior
          </label>

          <label>
            Согласен
            <input
              type="checkbox"
              name="licence"
              checked={this.state.licence}
              onChange={this.handleLinenceChange}
            />
          </label>
          <button type="submit" disabled={!this.state.licence}>Отправить</button>
        </form>
        <div>
          <p>Ваше имя: {this.state.name}</p>
          <p>Ваш акаунт: {this.state.account}</p>
          <p>Ваш уровень: {this.state.experience}</p>
        </div>
      </>
    );
  }
}

export default Form;
