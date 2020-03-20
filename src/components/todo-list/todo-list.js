import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => (
  <ul className="list-group">
    {todos.length !== 0 ? (
      todos.map(todo => {
        const { id, ...itemProps } = todo;
        return (
          <TodoListItem
            key={id}
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleImportant={() => onToggleImportant(id)}
          />
        );
      })
    ) : (
      <p>Todos list is empty</p>
    )}
  </ul>
);

export default TodoList;
