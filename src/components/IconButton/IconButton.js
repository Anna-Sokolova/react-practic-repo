import React from 'react';
import PropTypes from 'prop-types';
import styles from './IconButton.module.css';

const IconButton = ({ children, onClick, ...alyProps }) => (
  <button
    type="button"
    className={styles.IconButton}
    onClick={onClick}
    {...alyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  children: null,
  onClick: () => null,
};

IconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
