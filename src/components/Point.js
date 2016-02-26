require('normalize.css');
require('styles/App.css');

import React from 'react';

class Point extends React.Component {
  onClick() {
    this.props.onClick(this.props.player, this.props.index);
  }

  render() {
    var clasa = this.props.color === 'red' ? 'red-points' : 'black-points';
    var nameClass = 'points ' + clasa;

    return (
      <div style={this.props.style} onClick={this.onClick.bind(this)} className={nameClass}></div>
    )
  }
}

export default Point;
