import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

// export class Modal extends PureComponent {
//   render() {
//     return (
//       createPortal(
//         <Overlay>
//           <ModalWindow>{this.props.children}</ModalWindow>
//         </Overlay>,
//       ),
//       modalRoot
//     );
//   }
// }

// * class
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
//* func component
// export const Modal = ({ image, closeModal }) => {
//   return (
//     <Overlay>
//       <ModalWindow>
//         <img src={image} alt="" onClick={closeModal} />
//       </ModalWindow>
//     </Overlay>
//   );
// };
