require('normalize.css');
require('styles/App.css');

import React from 'react';

class GridPoint extends React.Component {
  onClick() {
    this.props.onClick(this.props.player, this.props.index);
  }

  render() {
    return (
      <div style={this.props.style} onClick={this.onClick.bind(this)} className='grid-points'></div>
    )
  }
}

export default GridPoint;
