import { PureComponent } from 'react';
import { Modal } from '../../Modal';
import { Item, Image } from './ImageGallery.styled';
export class ImageGalleryItem extends PureComponent {
  state = { showModal: false };

  handleShowModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImage: largeImageURL, tags: tags });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    console.log('close modal');
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
    // console.log(this.state.showModal);
  };

  render() {
    const { photoList } = this.props;
    const { showModal, largeImage, tags } = this.state;

    return (
      <>
        {photoList.map(({ id, webformatURL, largeImageURL, tags }) => (
          <Item
            key={id}
            onClick={() => this.handleShowModal(largeImageURL, tags)}
          >
            <Image src={webformatURL} alt={tags} />
          </Item>
        ))}
        {showModal && (
          <Modal onCloseModal={this.handleCloseModal}>
            <img src={largeImage} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
// export const ImageGalleryItem = ({ photoList }) => {
//   //   console.log('ImageGalleryItem', photoList);
//   return (
//     <>
//       {photoList.map(({ id, webformatURL, largeImageURL, tags }) => (
//         <li
//           key={id}
//           class="gallery-item"
//           onClick={() => console.log(1)}
//           image={largeImageURL}
//         >
//           <img src={webformatURL} alt={tags} />
//         </li>
//       ))}
//     </>
//   );
// };
