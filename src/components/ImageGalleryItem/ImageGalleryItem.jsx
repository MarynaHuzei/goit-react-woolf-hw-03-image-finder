import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => (
  <li className={styles.ImageGalleryItem} onClick={onClick}>
    <img
      src={image.webformatURL}
      alt={image.id}
      className={styles.ImageGalleryItemImage}
    />
  </li>
);

export default ImageGalleryItem;
