require('normalize.css');
require('styles/App.css');

import React from 'react';
import Point from './point.js';
import Grid from './grid.js';
import GridPoint from './gridPoints.js';

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      player: 1,
      red: 9,
      black: 9,
      array: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    };
  }

  onPointClick (player, index) {
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
  }

  getPosOnSquares(index) {
    return Math.floor(index/8);
  }

  getAbsPosX(index, width) {
    if((index < 1) || (index > 5)) {
      return 0;
    } else if (index===1 || index===5) {
      return 1*width;
    } else {
      return 2*width;
    }
  }

  getAbsPosY(index, width) {
    if(index < 3) {
      return 0;
    } else if (index ===3 || index===7){
      return 1*width;
    } else {
      return 2*width;
    }
  }

  resetState() {
    this.state.player = 1;
    this.state.red = 9;
    this.state.black = 9;
    this.state.array = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    this.forceUpdate();
  }

  render () {
    const points = [];
    const pointsOnGrid = [];
    for (let i=0; i<24; i++){
      let left = '';
      let top = '';
      let background = '';
      if(i<8) {
        left=this.getAbsPosX(i-(this.getPosOnSquares(i)*8),200)-10;
        top=this.getAbsPosY(i-(this.getPosOnSquares(i)*8),200)-10;
      } else if (i>15) {
        left=this.getAbsPosX(i-(this.getPosOnSquares(i)*8),100)+90;
        top=this.getAbsPosY(i-(this.getPosOnSquares(i)*8),100)+90;
      } else {
        left=this.getAbsPosX(i-(this.getPosOnSquares(i)*8),149)+40;
        top=this.getAbsPosY(i-(this.getPosOnSquares(i)*8),149)+40;
      }
      if (this.state.array[i] === 1){
        background = 'red';
      } else if (this.state.array[i] === 0) {
        background = 'black';
      } else {
        background = 'grey';
      }
      const style={left:left, top:top, background: background};
      const gridStyle={left:left-5, top:top-5};
      points.push(<Point key = {i} style = {style} onClick={this.onPointClick.bind(this)} index={i} player={this.state.player} />);
      pointsOnGrid.push(<GridPoint key = {i} style={gridStyle}> </GridPoint>)
    }
    return (
      <div>
        <div className="game-info">
          <span>Red: {this.state.red}</span>
          <span>Black: {this.state.black}</span>
          <button onClick={this.resetState.bind(this)}>Reset game</button>
        </div>
        <div className="board-div">
          {points}
          {pointsOnGrid}
          <Grid/>
        </div>
      </div>
    )
  }
}

export default Board;
