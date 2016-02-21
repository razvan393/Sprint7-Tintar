require('normalize.css');
require('styles/App.css');

import React from 'react';

var App = React.createClass({

  render: function () {
    return (
      <div className="board-div">
        <div className="base-div"></div
        ><div className="base-div"></div
        ><div className="base-div"></div
        ><div className="base-div"></div>
        <div className="absolute-div"></div>
      </div>
    );
  }
});

export default App;
