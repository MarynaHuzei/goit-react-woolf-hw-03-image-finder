import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import styles from './App.module.css';

const API_KEY = '38012427-abdef302c1869514a7af9c6c2';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
    modalImage: null,
    isSearchPerformed: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchName, currentPage } = this.state;
    this.setState({ isLoading: true, isSearchPerformed: true });

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: searchName,
          page: currentPage,
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });

      this.setState(prevState => ({
        images:
          currentPage === 1
            ? response.data.hits
            : [...prevState.images, ...response.data.hits],
        totalPages: Math.ceil(response.data.totalHits / 12),
        error: null,
      }));
    } catch (error) {
      this.setState({ error: 'Error fetching images' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = searchQuery => {
    this.setState({ searchName: searchQuery, currentPage: 1 });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  openModal = image => {
    this.setState({ modalImage: image.largeImageURL });
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const {
      images,
      isLoading,
      modalImage,
      currentPage,
      totalPages,
      isSearchPerformed,
    } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {modalImage && (
          <Modal largeImageURL={modalImage} closeModal={this.closeModal} />
        )}
        {!isLoading && images.length === 0 && isSearchPerformed && (
          <p className={styles.noMatches}>No matches found.</p>
        )}
        {!isLoading && images.length > 0 && currentPage < totalPages && (
          <Button handleClick={this.loadMoreImages}>Load More</Button>
        )}
      </div>
    );
  }
}
