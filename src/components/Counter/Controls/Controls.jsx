import styles from "./Controls.module.css";

const Controls = ({ onIncrement, onDecrement, finishValue }) => (
  <div className={styles.Counter__controls}>
    <button type="button" onClick={onIncrement}>
      Увеличить на 1
    </button>
    {finishValue > 0 && (
      <button type="button" onClick={onDecrement}>
        Уменьшить на 1
      </button>
    )}
  </div>
);
export default Controls;
