import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({
  label,
  done,
  important,
  onDeleted,
  onToggleDone,
  onToggleImportant
}) => {
  const classes = ['todo-item-text'];
  if (important) classes.push('important');
  if (done) classes.push('done');
  return (
    <li className="list-group-item todo-item">
      <span className={classes.join(' ')} onClick={onToggleDone}>
        {label}
      </span>
      <div className="todo-item-buttons">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={onToggleImportant}>
          <i className="fa fa-exclamation-circle" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={onDeleted}>
          <i className="fa fa-trash" />
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
