require('normalize.css');
require('styles/App.css');

import React from 'react';
import Board from './board.js';

var App = React.createClass({

  render: function () {
    return (
      <Board />
    );
  }
});

export default App;
