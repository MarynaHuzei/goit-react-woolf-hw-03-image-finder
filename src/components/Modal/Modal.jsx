import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleClick}>
      <div className={styles.Modal}>
        <img className={styles.ModalImage} src={largeImageURL} alt="Large" />
      </div>
    </div>
  );
};

export default Modal;
