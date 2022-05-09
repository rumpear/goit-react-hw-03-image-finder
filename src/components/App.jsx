import { PureComponent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/pixabayService';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Wrapper } from './App.styled';

export class App extends PureComponent {
  state = {
    searchQuery: '',
    totalNumberOfPhotos: 0,
    photoList: [],
    isLoading: false,
    error: null,
    page: 1,
  };

  handleSearch = value => {
    this.setState({ searchQuery: value, photoList: [], page: 1 });
  };

  handlePagination = page => {
    this.setState({ page });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (!searchQuery) return;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { totalHits, hits } = await fetchImages(searchQuery, page);

        if (hits.length === 0)
          toast.warn(`We didn't find any photos matching your request`);

        this.setState(({ photoList }) => ({
          photoList: [...photoList, ...hits],
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
    const {
      searchQuery,
      photoList,
      totalNumberOfPhotos,
      isLoading,
      error,
      page,
    } = this.state;

    const checkPages = () => {
      const totalPages = Math.floor(totalNumberOfPhotos / 12);
      return page < totalPages && photoList.length;
    };

    // const totalPages = Math.floor(totalNumberOfPhotos / 12);

    // console.log(error);
    // console.log('this.page', page);
    // console.log('totalPages', totalPages);
    // console.log('page < totalPages', page < totalPages);
    // console.log('totalNumberOfPhotos', totalNumberOfPhotos);
    // console.log(searchQuery);
    // console.log(photoList.length);

    return (
      <Wrapper>
        <Searchbar onSubmit={handleSearch} />
        {error && <h1>Whoops, something went wrong: {error.message}</h1>}
        {photoList.length > 0 && <ImageGallery photoList={photoList} />}

        {isLoading && <Loader />}

        {checkPages() ? (
          <Button page={page} onClick={handlePagination} />
        ) : null}

        {/* {page < totalPages && photoList.length >= 12 && (
          <Button page={page} onClick={handlePagination} />
        )} */}

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
