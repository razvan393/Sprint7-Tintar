require('normalize.css');
require('styles/App.css');

import React from 'react';

class Point extends React.Component{
  onClick () {
    this.props.onClick(this.props.player, this.props.index);
  }

  render () {
    return (
      <div style={this.props.style} onClick={this.onClick.bind(this)} className='points'></div>
    )
  }
}

export default Point;
