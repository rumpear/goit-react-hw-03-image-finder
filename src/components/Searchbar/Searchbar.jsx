import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Wrapper, Form, Button, Label, Input } from './Searchbar.styled';

export class Searchbar extends PureComponent {
  state = {
    input: '',
  };

  handleInput = e => {
    this.setState({ input: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.input) toast.warn('Search field must not be empty');

    this.props.onSubmit(this.state.input.trim());
    this.resetFrom();
  };

  resetFrom = () => {
    this.setState({ input: '' });
  };

  render() {
    const { handleInput, handleSubmit } = this;
    const { input } = this.state;

    return (
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            value={input}
            onInput={handleInput}
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Wrapper>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
