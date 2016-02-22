require('normalize.css');
require('styles/App.css');

import React from 'react';

var Point = React.createClass({

  render: function () {
    return (
      <div style={this.props.style} className="points"></div>
    )
  }
});

var Board = React.createClass({
  getPosOnSquares: function (index) {
    return Math.floor(index/8);
  },

  getAbsPosX: function (index, width) {
    if((index < 1) || (index > 5)) {
      return 0;
    } else if (index===1 || index===5) {
      return 1*width;
    } else {
      return 2*width;
    }
  },

  getAbsPosY: function (index, width) {
    if(index < 3) {
      return 0;
    } else if (index ===3 || index===7){
      return 1*width;
    } else {
      return 2*width;
    }
  },

  render: function () {
    var points = [];
    var style = '';
    for (var i=0; i<24; i++){
      if(i<8) {
        style={left:this.getAbsPosX(i-(this.getPosOnSquares(i)*8),200)-5, top:this.getAbsPosY(i-(this.getPosOnSquares(i)*8),200)-5};
      } else if (i>15) {
        style={left:this.getAbsPosX(i-(this.getPosOnSquares(i)*8),100)+95, top:this.getAbsPosY(i-(this.getPosOnSquares(i)*8),100)+95};
      } else {
        style={left:this.getAbsPosX(i-(this.getPosOnSquares(i)*8),149)+45, top:this.getAbsPosY(i-(this.getPosOnSquares(i)*8),149)+45};
      }
      points.push(<Point key = {i} style = {style} value={i} />);
    }
    return (
      <div className="board-div">
        {points}
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
});

var App = React.createClass({

  render: function () {
    return (
      <Board />
    );
  }
});

export default App;
