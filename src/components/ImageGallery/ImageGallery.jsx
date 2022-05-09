import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
export const ImageGallery = ({ photoList }) => {
  // console.log('ImageGallery', photoList);
  return (
    <Gallery>
      <ImageGalleryItem photoList={photoList}></ImageGalleryItem>
    </Gallery>
  );
};
