import { PureComponent } from 'react';

import { LoadMoreBtn } from './Button.styled';

export class Button extends PureComponent {
  state = { page: 2 };
  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    this.props.onClick(this.state.page);
  };

  render() {
    return (
      <LoadMoreBtn type="button" onClick={this.incrementPage}>
        Load more
      </LoadMoreBtn>
    );
  }
}

// export const Button = ({ photoList, page }) => {
//   this.setState(({ page }) => ({ page: page + 1 }));
//   console.log('Button', page);
//   return <button type="button">Load more</button>;
// };
