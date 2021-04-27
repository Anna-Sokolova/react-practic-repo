import React, { Component } from 'react';
import { createPortal } from 'react-dom'; // импорт метода для создания портала для модалки
import Button from '../Button/Button'
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root'); //находим элемент в ДОМе, чтоб зарендерить в него разметку модалки

class Modal extends Component {
  componentDidMount() {
    //вешаем слушателя на виндов на событие кнопки
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    //снимаем слушателя с виндов на событие кнопки, чтобы избежать утечки памяти
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  //метод для закрытия модалки по кнопке ESC
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  //метод для закрытия модалки по бекдропу
  handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.modalBackdrop} onClick={this.handleBackdropClose}>
        <div className={styles.modalContent}>{this.props.children}</div>

      </div>,
      modalRoot,
    );
  }
}

export default Modal;
