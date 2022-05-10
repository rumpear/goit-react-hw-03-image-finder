import ClipLoader from 'react-spinners/ClipLoader';

export const Loader = () => (
  <ClipLoader
    size={70}
    css={`
      display: block;
      margin: 0 auto;
      border-color: #0099ff;
    `}
  />
);
