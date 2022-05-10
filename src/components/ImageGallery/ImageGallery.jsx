import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ photoList }) => {
  return (
    <Gallery>
      {photoList.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  photoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ),
};
