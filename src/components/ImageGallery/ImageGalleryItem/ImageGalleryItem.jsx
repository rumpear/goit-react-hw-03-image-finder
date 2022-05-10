import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from '../../Modal';
import { Item, Image } from './ImageGallery.styled';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <Item onClick={this.handleToggleModal}>
          <Image src={webformatURL} alt={tags} />
        </Item>
        {showModal && (
          <Modal onCloseModal={this.handleToggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
