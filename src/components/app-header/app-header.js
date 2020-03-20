import React from 'react';

const AppHeader = ({ toDo, done }) => (
  <nav className="navbar navbar-light bg-light">
    <h1 className="navbar-brand">TODO</h1>
    <h4>
      {toDo} more to do, {done} done
    </h4>
  </nav>
);

export default AppHeader;
