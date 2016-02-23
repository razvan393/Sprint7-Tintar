require('normalize.css');
require('styles/App.css');

import React from 'react';

class GridPoint extends React.Component{
  render () {
    return (
      <div style={this.props.style} className='grid-points'></div>
    )
  }
}

export default GridPoint;
