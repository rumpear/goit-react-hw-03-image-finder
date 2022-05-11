import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/pixabayService';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    totalNumberOfPhotos: 0,
    photoList: [],
    isLoading: false,
    error: null,
    page: 1,
  };

  handleSearch = value => {
    this.setState({ searchQuery: value });
    this.resetStates();
  };

  handlePagination = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  resetStates = () => {
    this.setState({ photoList: [], page: 1, error: null });
  };

  async componentDidMount() {
    this.setState({ searchQuery: 'nature' });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (!searchQuery) return;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { totalHits, hits } = await fetchImages(searchQuery, page);

        if (hits.length === 0)
          toast.warn(`We didn't find any photos matching your request`);

        const photos = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });

        this.setState(({ photoList }) => ({
          photoList: [...photoList, ...photos],
          totalNumberOfPhotos: totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { handleSearch, handlePagination } = this;
    const { photoList, totalNumberOfPhotos, isLoading, error, page } =
      this.state;
    const checkPages = () => {
      const totalPages = Math.floor(totalNumberOfPhotos / 12);
      return page < totalPages && photoList.length >= 12;
    };

    return (
      <Wrapper>
        <Searchbar onSubmit={handleSearch} />
        {error && <ErrorMessage message={error.message} />}
        {photoList.length > 0 && <ImageGallery photoList={photoList} />}
        {isLoading && <Loader />}
        {checkPages() && <Button onClick={handlePagination} />}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    );
  }
}
