require('normalize.css');
require('styles/App.css');

import React from 'react';

class PiecesLeft extends React.Component {
  render() {
    const pieces = [];

    for (let i = 0; i < this.props.count; i++) {
      pieces.push(<span className="points-left" key={i} style={this.props.style}> </span>);
    }

    return (
      <div>{pieces}</div>
    )
  }
}

export default PiecesLeft;
