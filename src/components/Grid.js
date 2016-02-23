require('normalize.css');
require('styles/App.css');

import React from 'react';

class Grid extends React.Component{
  render () {
    return (
      <div className="grid">
        <div className="base-div"></div>
        <div className="base-div"></div>
        <div className="base-div"></div>
        <div className="base-div"></div>
        <div className="absolute-div">
          <div className="second-base-div"></div>
          <div className="second-base-div"></div>
          <div className="second-base-div"></div>
          <div className="second-base-div"></div>
          <div className="second-absolute-div"></div>
        </div>
      </div>
    )
  }
}

export default Grid;
