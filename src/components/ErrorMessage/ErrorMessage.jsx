import PropTypes from 'prop-types';
import { Text } from './ErrorMessage.styled';

export const ErrorMessage = ({ message }) => (
  <Text>Whoops, something went wrong: {message}</Text>
);

ErrorMessage.propTypes = { message: PropTypes.string.isRequired };
