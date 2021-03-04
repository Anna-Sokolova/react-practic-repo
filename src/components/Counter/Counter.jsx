import React, { Component } from "react";
import Controls from "./Controls/Controls";

import styles from "./Counter.module.css";

class Counter extends Component {
  //описание дефолтных пропов
  static defaultProps = {
    initialValue: 0,
  };

  //описание типов пропов
  static propTypes = {
    //
  };

  //внутренне состояние объекта (класса), тоже как публичное свойствоб всегда объект, хранит в себе свойства состояния объекта
  state = {
    value: this.props.initialValue,
  };

  //публичные свойства класса
  handleIncrement = () => {
    //обновление состояния через метод setState, !!!!!!!!!!!!!!!!!!!ОБНОВЛЯТЬ СОСТОЯНИЕ ПО ССЫЛКЕ НЕЛЬЗЯ => this.state.value = 10  !!!!!!!!!!!!!!!!!!!!!!!!
    // this.setState({
    //   value: 200, // используется, если нужно просто записать новое состояние по какому-то событию (изменяет объявленное свойство в state),
    //                  можно перезаписать только какое-то 1 свойство или несколько, не обязательно все, которые есть в state
    //если нужно обновлять состояние после события, используется свойство prevState, который сохраняет актуальное состояние, =Ю если нужно изменить от предыдущего состояния
    //this.setState(prevState => {
    //   return {
    //     value: prevState.value и далее какое-то действие, например + 1;
    //   }
    // })
    // });
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
    console.log("Кликнули на Увеличить");
  };

  handleDecrement = () => {
    this.setState((prevState) => ({
      value: prevState.value - 1,
    }));

    console.log("Кликнули на Уменьшить");
  };

  render() {
    return (
      <div className={styles.Counter}>
        <span className={styles.Counter__value}>{this.state.value}</span>

        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          finishValue={this.state.value}
        />
      </div>
    );
  }
}

export default Counter;
