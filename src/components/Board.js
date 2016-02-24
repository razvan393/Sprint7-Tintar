require('normalize.css');
require('styles/App.css');

import React from 'react';
import Point from './point.js';
import Grid from './grid.js';
import GridPoint from './gridPoints.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 1,
      red: 9,
      black: 9,
      phase: 1,
      isRemove: 0,
      isSelected: 0,
      redWin: 0,
      blackWin: 0,
      array: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    };
  }

  onPointClick(player, index) {
    var obj = this.getNeighbours(index);
    if (this.state.isRemove === 1) {
      if(this.state.array[index] === 1) {
        this.state.blackWin ++;
      } else {
        this.state.redWin ++;
      }
      this.state.array[index] = -1;
      this.state.isRemove = 0;
      this.forceUpdate();
    } else if (this.state.phase === 1) {
      if (this.state.array[index] === -1) {
        if ((player == 1) && (this.state.red > 0)) {
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
      if ((this.state.red === 0) && (this.state.black === 0) && (this.isMill(obj.line, index) || this.isMill(obj.column, index))) {
        console.log((this.state.array[index] === 1 ? 'Red' : 'Black') + ' can move an opponents piece!');
        this.state.isRemove = 1;
      } else if ((this.state.red === 0) && (this.state.black === 0)) {
        this.state.phase = 2;
      }

    } else if ((this.state.phase === 2) && (this.state.isSelected === 0)) {
      if (this.state.array[index] !== -1) {
        this.state.isSelected = index;
        this.forceUpdate();
      }
    } else if ((this.state.phase === 2) && (this.state.isSelected !== 0)) {
      if ((this.state.array[index] === -1) && (this.isInArray(this.getPosMove(this.state.isSelected), index))) {
        this.state.array[index] = this.state.array[this.state.isSelected];
        this.state.array[this.state.isSelected] = -1;
        this.state.isSelected = 0;
        this.forceUpdate();
      }
    }
    if (this.isMill(obj.line, index) || this.isMill(obj.column, index)) {
      console.log((this.state.array[index] === 1 ? 'Red' : 'Black') + ' can move an opponents piece!');
      this.state.isRemove = 1;
      this.forceUpdate();
    }
    if (this.state.redWin === 7){
      this.resetState();
      alert('Red won');
    }
    if (this.state.blackWin === 7){
      this.resetState();
      alert('Black won');
    }
  }

  isInArray(array, number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === number) {
        return true;
      }
    }
    return false;
  }


  getPosOnSquares(index) {
    return Math.floor(index / 8);
  }

  getAbsPosX(index, width) {
    if ((index < 1) || (index > 5)) {
      return 0;
    } else if (index === 1 || index === 5) {
      return 1 * width;
    } else {
      return 2 * width;
    }
  }

  getAbsPosY(index, width) {
    if (index < 3) {
      return 0;
    } else if (index === 3 || index === 7) {
      return 1 * width;
    } else {
      return 2 * width;
    }
  }

  resetState() {
    this.state.player = 1;
    this.state.red = 9;
    this.state.black = 9;
    this.state.phase = 1;
    this.state.array = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.forceUpdate();
  }

  getPosMove(index) {
    var obj = [];
    var rectangle = Math.floor(index / 8);
    obj.push(((index + 7) % 8) + (8 * rectangle));
    obj.push(((index + 1) % 8) + (8 * rectangle));
    if (index % 2 === 1) {
      if (rectangle === 0) {
        obj.push(index + 8);
      } else if (rectangle === 2) {
        obj.push(index - 8);
      } else {
        obj.push(index - 8);
        obj.push(index + 8);
      }
    }
    return obj;
  }

  getNeighbours(index) {
    var line = [];
    var column = [];
    var rectangle = Math.floor(index / 8);
    if (index % 2 === 1) {
      line.push(((index + 7) % 8) + (8 * rectangle));
      line.push(((index + 1) % 8) + (8 * rectangle));
      if (rectangle === 0) {
        column.push(index + 8);
        column.push(index + 16);
      } else if (rectangle === 2) {
        column.push(index - 8);
        column.push(index - 16);
      } else {
        column.push(index - 8);
        column.push(index + 8);
      }
    } else {
      if (index % 4 === 0) {
        line.push(((index + 1) % 8) + (8 * rectangle));
        line.push(((index + 2) % 8) + (8 * rectangle));
        column.push(((index + 6) % 8) + (8 * rectangle));
        column.push(((index + 7) % 8) + (8 * rectangle));
      } else {
        column.push(((index + 1) % 8) + (8 * rectangle));
        column.push(((index + 2) % 8) + (8 * rectangle));
        line.push(((index + 6) % 8) + (8 * rectangle));
        line.push(((index + 7) % 8) + (8 * rectangle));
      }
    }
    return {line, column};
  }

  isMill(array, index) {
    var numberOf0 = 0;
    var numberOf1 = 0;
    for (let i = 0; i < array.length; i++) {
      if (this.state.array[array[i]] === 0) {
        numberOf0++;
      } else if (this.state.array[array[i]] === 1) {
        numberOf1++;
      }
    }
    if (((numberOf0 >= 2) && (this.state.array[index] === 0)) || ((numberOf1 >= 2) && (this.state.array[index] === 1))) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const points = [];
    const pointsOnGrid = [];
    for (let i = 0; i < 24; i++) {
      let left = '';
      let top = '';
      let background = '';
      if (i < 8) {
        left = this.getAbsPosX(i - (this.getPosOnSquares(i) * 8), 200) - 10;
        top = this.getAbsPosY(i - (this.getPosOnSquares(i) * 8), 200) - 10;
      } else if (i > 15) {
        left = this.getAbsPosX(i - (this.getPosOnSquares(i) * 8), 100) + 90;
        top = this.getAbsPosY(i - (this.getPosOnSquares(i) * 8), 100) + 90;
      } else {
        left = this.getAbsPosX(i - (this.getPosOnSquares(i) * 8), 149) + 40;
        top = this.getAbsPosY(i - (this.getPosOnSquares(i) * 8), 149) + 40;
      }
      if (this.state.array[i] === 1) {
        background = 'red';
      } else if (this.state.array[i] === 0) {
        background = 'black';
      } else {
        background = 'grey';
      }
      const style = {left: left, top: top, background: background};
      const gridStyle = {left: left - 5, top: top - 5};
      points.push(<Point key={i} style={style} onClick={this.onPointClick.bind(this)} index={i}
                         player={this.state.player}/>);
      pointsOnGrid.push(<GridPoint key={i} style={gridStyle}> </GridPoint>)
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
        <div>This is phase {this.state.phase}</div>
      </div>
    )
  }
}

export default Board;
