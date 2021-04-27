import React, { Component, useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';

//переписываем Timer на ХУКИ

export default function Timer() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  // console.log(time, setTime);

  const intervalId = useRef();

  console.log(intervalId.current); // сохраняет текущее значение переменной при любых ре-рендерах

  useEffect(() => {
    intervalId.current = setInterval(() => {
      console.log('Эта функция вызывается каждую секунду в интервале');
      setTime(new Date());
    }, 1000);

    return () => {
      console.log('Эта функция вызывается перед последним рендером = зачистка');
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className={styles.timerFace}>
      <p>{time.toLocaleTimeString()}</p>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
}

// export default class Timer extends Component {
//   state = {
//     date: new Date().toLocaleDateString(),
//     time: new Date().toLocaleTimeString(),
//   };

//   //объявляем переменную для будущей зачистки таймера как публичное свойство
//   intervalId = null;

//   componentDidMount() {
//     // console.log('setInterval');
//     //монтирование таймера в разметку, сразу записываем setInterval в intervalId
//     this.intervalId = setInterval(
//       () => this.setState({ time: new Date().toLocaleTimeString() }),
//       1000,
//     );
//   }

//   componentWillUnmount() {
//     //размонтирование таймера, делаем зачистку, чтоб не было утечки памяти
//     clearInterval(this.intervalId);
//   }

//   render() {
//     return (
//       <div className={styles.timerFace}>
//         <p>{this.state.time}</p>
//         <p>{this.state.date}</p>
//       </div>
//     );
//   }
// }

//если таймер будет работать всегда на странице и не будет прятаться, тогда зачищать не нужно
