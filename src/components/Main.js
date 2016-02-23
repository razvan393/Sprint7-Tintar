require('normalize.css');
require('styles/App.css');

import React from 'react';
import Board from './board.js';

class App extends React.Component{

  render () {
    return (
      <Board />
    );
  }
}

export default App;
