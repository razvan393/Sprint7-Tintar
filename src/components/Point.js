require('normalize.css');
require('styles/App.css');

import React from 'react';

var Point = React.createClass({
  onClick: function () {
    this.props.onClick(this.props.player, this.props.index);
  },

  render: function () {
    return (
      <div style={this.props.style} onClick={this.onClick} className='points'></div>
    )
  }
});

export default Point;
