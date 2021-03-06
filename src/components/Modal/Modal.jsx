import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

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

    return createPortal(
      <Overlay onClick={handleOverlayClick}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
