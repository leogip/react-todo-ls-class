import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {
  buttons = [
    { filter: 'all', label: 'All' },
    { filter: 'active', label: 'Active' },
    { filter: 'done', label: 'Done' }
  ];

  state = {
    filter: ''
  };

  render() {
    const { currFilter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ label, filter }) => {
      const classes =
        currFilter === filter ? 'btn btn-dark' : 'btn btn-outline-dark';
      return (
        <button
          type="button"
          className={classes}
          key={filter}
          onClick={() => onFilterChange(filter)}>
          {label}
        </button>
      );
    });
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        {buttons}
      </div>
    );
  }
}
