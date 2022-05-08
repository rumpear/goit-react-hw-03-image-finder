import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ photoList }) => {
  // console.log('ImageGallery', photoList);
  return (
    <ul class="gallery">
      <ImageGalleryItem photoList={photoList}></ImageGalleryItem>
    </ul>
  );
};
