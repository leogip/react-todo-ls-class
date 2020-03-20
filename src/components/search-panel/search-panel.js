import React, { Component } from 'react';

export default class SearchPanel extends Component {
  state = {
    term: ''
  };

  onChangeTerm = e => {
    this.setState({
      term: e.target.value
    });
    this.props.onSearchChange(e.target.value);
  };

  render() {
    return (
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Search ToDo"
          value={this.state.term}
          onChange={this.onChangeTerm}
        />
      </div>
    );
  }
}
