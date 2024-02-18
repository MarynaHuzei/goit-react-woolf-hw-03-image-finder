import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.webformatURL}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
