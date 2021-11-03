import React, { Component } from 'react';

class Input extends Component {
  render() {
    let { name, value, onChange } = this.props;

    return (
      <input
        type="text"
        name={ name }
        value={ value }
        onChange={ onChange }
      />
    );
  }
}

export default Input;