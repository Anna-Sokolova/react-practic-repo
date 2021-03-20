import React, { Component } from 'react';
import styles from './Timer.module.css';

export default class Timer extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  //объявляем переменную для будущей зачистки таймера
  intervalId = null;

  componentDidMount() {
    // console.log('setInterval');
    //монтирование таймера в разметку, сразу записываем setInterval в intervalId
    this.intervalId = setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000,
    );
  }

  componentWillUnmount() {
    //размонтирование таймера, делаем зачистку, чтоб не было утечки памяти
    clearInterval(this.intervalId);
  }

  render() {
    return <div className={styles.timerFace}>{this.state.time}</div>;
  }
}

//если таймер будет работать всегда на странице и не будет прятаться, тогда зачищать не нужно
