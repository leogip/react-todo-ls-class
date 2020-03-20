import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    label: ''
  };

  onChangeLabel = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmitAdd = e => {
    e.preventDefault();
    if (this.state.label.trim() !== '') {
      this.props.onAdded(this.state.label);
      this.setState({ label: '' });
    }
  };

  render() {
    return (
      <form className="form-inline mt-5 todo-add" onSubmit={this.onSubmitAdd}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type Name Todo"
            value={this.state.label}
            onChange={this.onChangeLabel}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Add Item
        </button>
      </form>
    );
  }
}
