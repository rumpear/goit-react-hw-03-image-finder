import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { LoadMoreBtn } from './Button.styled';

export class Button extends PureComponent {
  incrementPage = () => {
    const { page, onClick } = this.props;
    onClick(page + 1);
  };

  render() {
    return (
      <LoadMoreBtn type="button" onClick={this.incrementPage}>
        Load more
      </LoadMoreBtn>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
