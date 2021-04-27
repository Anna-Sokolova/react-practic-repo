// Выпадающее меню

import React, { Component, useState } from 'react';
import styles from './Dropdown.module.css';

//Компонент с тоглом для выпадающего меню на хуках
function Dropdown() {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };
  
  return (
    <div className={styles.Dropdown}>
      <button
        type="button"
        className={styles.Dropdown__toggle}
        onClick={toggle}
      >
        {visible ? 'Скрыть' : 'Показать'}
      </button>

      {visible && <div className={styles.Dropdown__menu}>Выпадающее меню</div>}
    </div>
  );
}

//Компонент с тоглом для выпадающего меню
// class Dropdown extends Component {
//   state = {
//     visible: false,
//   };

//   toggle = () => {
//     this.setState((prevState) => ({
//       visible: !prevState.visible,
//     }));
//   };

//   render() {
//     return (
//       <div className={styles.Dropdown}>
//         <button type="button" className={styles.Dropdown__toggle} onClick={this.toggle}>
//           {this.state.visible ? "Скрыть" : "Показать"}
//         </button>

//         {this.state.visible && <div className={styles.Dropdown__menu}>Выпадающее меню</div>}
//       </div>
//     );
//   }
// }

//Компонент с двумя кнопками для выпадающего меню

// class Dropdown extends Component {
//   state = {
//     visible: false,
//   };

//   show = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   hide = () => {
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     return (
//       <div className={styles.Dropdown}>
//         <button type="button" className={styles.Dropdown__toggle} onClick={this.show}>
//           Показать
//         </button>

//         <button type="button" className={styles.Dropdown__toggle} onClick={this.hide}>
//           Скрыть
//         </button>

//         {this.state.visible && <div className={styles.Dropdown__menu}>Выпадающее меню</div>}
//       </div>
//     );
//   }
// }

export default Dropdown;
