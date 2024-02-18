import React from 'react';
import styles from './Button.module.css';

const Button = ({ handleClick, children }) => {
  return (
    <button
      className={styles.Button}
      onClick={handleClick}
      style={{ display: 'block', margin: '20px auto', padding: '10px 20px' }}
    >
      {children}
    </button>
  );
};

export default Button;
