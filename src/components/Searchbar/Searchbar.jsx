import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends PureComponent {
  state = {
    input: '',
  };

  handleInput = e => {
    this.setState({ input: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.resetFrom();
  };

  resetFrom = () => {
    this.setState({ input: '' });
  };

  render() {
    const { handleInput, handleSubmit } = this;
    const { input } = this.state;

    return (
      <header class="searchbar">
        <form class="form" onSubmit={handleSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            value={input}
            onInput={handleInput}
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
