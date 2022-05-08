import { PureComponent } from 'react';

export class Button extends PureComponent {
  state = { page: 2 };
  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    this.props.onClick(this.state.page);
  };

  render() {
    return (
      <button type="button" onClick={this.incrementPage}>
        Load more
      </button>
    );
  }
}

// export const Button = ({ photoList, page }) => {
//   this.setState(({ page }) => ({ page: page + 1 }));
//   console.log('Button', page);
//   return <button type="button">Load more</button>;
// };
