import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { name, value, onChange } = this.props;
    return (
      <input
        type="number"
        name={ name }
        min="0"
        max="59"
        step="1"
        value={ value }
        onChange={ onChange }
      />
    );
  }
}

export default Input;