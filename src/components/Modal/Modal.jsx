import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKeydown);
  }

  handleEscKeydown = e => {
    if (e.code === 'Escape') this.props.onCloseModal();
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) this.props.onCloseModal();
  };

  render() {
    const { children } = this.props;
    const { handleOverlayClick } = this;

    return (
      <Overlay onClick={handleOverlayClick}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
