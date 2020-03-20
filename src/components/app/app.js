import React, { Component, Fragment } from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import TodoList from '../todo-list/todo-list';
import ItemAddForm from '../item-add-form/item-add-form';

export default class App extends Component {
  startID = 100;
  state = {
    todoItems: JSON.parse(localStorage.getItem('todos')) || [],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      id: this.startID++,
      label,
      done: false,
      important: false
    };
  }

  toggleTodoProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  search(items, term) {
    if (term.length === 0) return items;

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  onSearchChange = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  onDeleted = id => {
    this.setState(({ todoItems }) => {
      const idx = todoItems.findIndex(el => el.id === id);
      const items = [...todoItems.slice(0, idx), ...todoItems.slice(idx + 1)];
      localStorage.setItem('todos', JSON.stringify(items));
      return {
        todoItems: items
      };
    });
  };

  onAdded = label => {
    const items = [...this.state.todoItems, this.createTodoItem(label)];
    localStorage.setItem('todos', JSON.stringify(items));
    this.setState(({ todoItems }) => ({
      todoItems: [...todoItems, this.createTodoItem(label)]
    }));
  };

  onToggleDone = id => {
    const items = this.toggleTodoProperty(this.state.todoItems, id, 'done');
    localStorage.setItem('todos', JSON.stringify(items));
    this.setState(({ todoItems }) => ({
      todoItems: this.toggleTodoProperty(todoItems, id, 'done')
    }));
  };

  onToggleImportant = id => {
    const items = this.toggleTodoProperty(
      this.state.todoItems,
      id,
      'important'
    );
    localStorage.setItem('todos', JSON.stringify(items));
    this.setState(({ todoItems }) => ({
      todoItems: this.toggleTodoProperty(todoItems, id, 'important')
    }));
  };

  render() {
    const { todoItems, term, filter } = this.state;

    const visibilityItem = this.filter(this.search(todoItems, term), filter);

    const doneCount = todoItems.filter(el => el.done).length;
    const todoCount = todoItems.length - doneCount;

    return (
      <Fragment>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-9">
              <SearchPanel onSearchChange={this.onSearchChange} />
            </div>
            <div className="col-md-3" style={{ textAlign: 'right' }}>
              <ItemStatusFilter
                currFilter={filter}
                onFilterChange={this.onFilterChange}
              />
            </div>
          </div>
          <TodoList
            todos={visibilityItem}
            onDeleted={this.onDeleted}
            onToggleDone={this.onToggleDone}
            onToggleImportant={this.onToggleImportant}
          />
          <ItemAddForm onAdded={this.onAdded} />
        </div>
      </Fragment>
    );
  }
}
