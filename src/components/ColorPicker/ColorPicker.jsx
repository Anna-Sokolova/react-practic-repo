import { PureComponent } from 'react'; //используем PureComponent чтобы не было перерендера при нажатии на один и тот же элемент (выбор цвета в данном случае)
import styles from './ColorPicker.module.css';

class ColorPicker extends PureComponent {
  state = {
    activeOptionIdx: 0, // записываем в объект состояния начальный индекс массива
  };

  //если наследовать от обычного Component, тогда лучше делать проверку в shouldComponentUpdate
  // на сравнение изменений в одном и том же элементе

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.activeOptionIdx !== this.state.activeOptionIdx;
  // }

  //метод выбора цвета по клику на кнопку
  setActivColor = index => {
    this.setState({
      activeOptionIdx: index,
    });
  };

  //метод для изменения класса по условию
  makeOptionClasses = index => {
    const optionStyles = [styles.ColorPicker__option];

    if (index === this.state.activeOptionIdx) {
      optionStyles.push(styles.ColorPicker__optionActive);
    }
    return optionStyles.join(' ');
  };

  render() {
    // console.log(Math.random()); //консоль для проверки ре-рендера

    //вычисляемые свойства
    const activColorBtn = this.props.options; //получаем весь массив значений в переменной
    const activColorBtnIndex = activColorBtn[this.state.activeOptionIdx]; //получаем значение в массиве по необх индексу

    return (
      <div className={styles.ColorPicker}>
        <h2 className={styles.ColorPicker__title}>ColorPicker</h2>
        <p>
          Выбран цвет - {activColorBtnIndex.label}, HEX{' '}
          {activColorBtnIndex.color}
        </p>
        <div>
          {this.props.options.map(({ label, color }, index) => (
            <button
              key={label}
              className={this.makeOptionClasses(index)}
              style={{
                backgroundColor: color,
                //ПРИМЕР ДОБАВЛЕНИЯ КЛАССА ПО УСЛОВИЮ
                // border:
                //   index === this.state.activeOptionIdx
                //     ? '5px solid black'
                //     : 'none',
              }}
              onClick={() => {
                this.setActivColor(index);
              }}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

// const ColorPicker = ({ options }) => {
//   return (
//     <div className={styles.ColorPicker}>
//       <h2 className={styles.ColorPicker__title}>ColorPicker</h2>

//       <div>
//         {options.map(({ label, color }) => {
//           return (
//             <span
//               key={label}
//               className={styles.ColorPicker__option}
//               style={{ backgroundColor: color }}
//             ></span>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

export default ColorPicker;
