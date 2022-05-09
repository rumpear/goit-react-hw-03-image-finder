import { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Container } from './Container';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { fetchImages } from '../services/pixabayService';
// import { Modal } from './Modal';
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
    this.setState({ page: page });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    // this.setState({ isLoading: true });

    if (!searchQuery) return;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { totalHits, hits } = await fetchImages(searchQuery, page);
        // this.setState({
        //   photoList: hits,
        //   totalNumberOfPhotos: totalHits,
        //   // isLoading: false,
        // });

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
    const { handleSearch } = this;
    const {
      searchQuery,
      photoList,
      totalNumberOfPhotos,
      isLoading,
      error,
      page,
    } = this.state;
    const { handlePagination } = this;

    console.log('this.state', page);

    // console.log('handlePagination', handlePagination);

    console.log(searchQuery);
    // console.log(totalNumberOfPhotos);

    return (
      <Wrapper>
        <Searchbar onSubmit={handleSearch} />
        {photoList.length > 0 && <ImageGallery photoList={photoList} />}
        {isLoading && <h1>212</h1>}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {photoList.length > 11 && (
          <Button
            // photoList={photoList}
            page={page}
            onClick={handlePagination}
          />
        )}
        <ToastContainer
          // limit={1}
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
