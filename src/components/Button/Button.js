import styles from './Button.module.css';

const Button = ({ onClose }) => (
  <button type="button" className={styles.btnClose} onClick={onClose}>
    x
  </button>
);

export default Button;
