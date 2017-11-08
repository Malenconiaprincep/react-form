import React, { Component } from 'react';

class Input extends Component {

  static state = {
    value: '',
    name: ''
  }

  onChange(e) {
    const value = e.target.value;
    const {formkey, handleRelatedChange} = this.props;


    this.setState({
      name: formkey,
      value
    }, () => {
      this.props.handleFieldChange({
        name: formkey,
        value
      })
      handleRelatedChange({
        name: formkey,
        value
      })
    })
  }

  render() {
    console.log('render Input')
    return (
      <div className="App">
        <input
          onChange={this.onChange.bind(this)}
          // onBlur={this.onBlur.bind(this)}
          // onFocus={this.onFocus.bind(this)}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default Input;
