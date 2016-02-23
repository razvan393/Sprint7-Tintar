require('normalize.css');
require('styles/App.css');

import React from 'react';
import Point from './point.js';
import Grid from './grid.js';

var Board = React.createClass({
  getInitialState: function () {
    var player = 1;
    var red = 9;
    var black = 9;
    var array = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    return {
      player: player,
      array: array,
      red: red,
      black: black
    }
  },

  onPointClick: function (player, index) {
    if (this.state.array[index] === -1){
      if ((player==1)&&(this.state.red > 0)) {
        this.state.player = 0;
        this.state.array[index] = 1;
        this.state.red -= 1;
      } else if (this.state.black > 0) {
        this.state.player = 1;
        this.state.array[index] = 0;
        this.state.black -= 1;
      }
      this.forceUpdate();
    }
  },

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
    var left = '';
    var top = '';
    var background = '';
    for (var i=0; i<24; i++){
      if(i<8) {
        left=this.getAbsPosX(i-(this.getPosOnSquares(i)*8),200)-5;
        top=this.getAbsPosY(i-(this.getPosOnSquares(i)*8),200)-5;
      } else if (i>15) {
        left=this.getAbsPosX(i-(this.getPosOnSquares(i)*8),100)+95;
        top=this.getAbsPosY(i-(this.getPosOnSquares(i)*8),100)+95;
      } else {
        left=this.getAbsPosX(i-(this.getPosOnSquares(i)*8),149)+45;
        top=this.getAbsPosY(i-(this.getPosOnSquares(i)*8),149)+45;
      }
      if (this.state.array[i] === 1){
        background = 'red';
      } else if (this.state.array[i] === 0) {
        background = 'black';
      } else {
        background = 'grey';
      }
      style={left:left, top:top, background: background};
      points.push(<Point key = {i} style = {style} onClick={this.onPointClick} index={i} player={this.state.player} />);
    }

    return (
      <div>
        <div>Red: {this.state.red} Black: {this.state.black}</div>
        <div className="board-div">
          {points}
          <Grid/>
        </div>
      </div>
    )
  }
});

export default Board;
