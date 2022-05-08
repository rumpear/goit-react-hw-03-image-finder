export const ImageGalleryItem = ({ photoList }) => {
  //   console.log('ImageGalleryItem', photoList);
  return (
    <>
      {photoList.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} class="gallery-item">
          <img src={webformatURL} alt={tags} />
        </li>
      ))}
    </>
  );
};
