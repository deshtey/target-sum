import React, { Component } from "react";
import Number from "./Number";
import _ from "lodash";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "new",
      activeButtons: [],
      remainingSeconds: 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  randomNumbers = Array.from({ length: this.props.size }).map(
    () => Math.ceil(Math.random() * 13) + 1
  );
  target = _.sampleSize(this.randomNumbers, this.props.sampleSize).reduce(
    (accum, current) => accum + current
  );
  //function to start the game
  startGame() {
    this.setState({ status: "playing" }, () => {
      this.intervalId = setInterval(() => {
        this.setState(prev => {
          const newRemainingSeconds = prev.remainingSeconds - 1;
          if (newRemainingSeconds === 0) {
            clearInterval(this.intervalId);
            return { status: "lost", remainingSeconds: 0 };
          }
          return { remainingSeconds: newRemainingSeconds };
        });
      }, 1000);
    });
  }

  //function to keep track of the selected numbers
  handleClick(id) {
    //make a shallow copy of the activeButtons
    //Then update the activeButtons and set the new state
    const activeButtons = this.state.activeButtons.slice();
    if (activeButtons.indexOf(id) === -1) {
      activeButtons.push(id);
    } else {
      let index = activeButtons.indexOf(id);
      activeButtons.splice(index, 1);
    }
    this.setState({ activeButtons: activeButtons });
    this.gameStatus(activeButtons);
  }

  //function to calculate the sum of selected numbers

  gameStatus(ids) {
    const sumSelected = ids.reduce((accum, current) => {
      return accum + this.randomNumbers[current];
    }, 0);
    if (ids.length === 4 && sumSelected === this.target) {
      clearInterval(this.intervalId);
      this.setState({ status: "won" });
    }
  }

  componentWillUnmount() {
    console.log("new");
  }
  componentDidMount() {
    if (this.props.autoPlay) {
      this.startGame();
    }
  }
  render() {
    const status = this.state.status;

    return (
      <div className="game">
        <div id="target" className={this.state.status}>
          {status === "new" ? "Target" : this.target}
        </div>
        <div className="challenge-numbers">
          {this.randomNumbers.map((value, index) => (
            <Number
              id={index}
              key={index}
              value={status === "new" ? "?" : value}
              handleClick={this.handleClick}
              active={this.state.activeButtons.indexOf(index)}
              status={this.state.status}
            />
          ))}
        </div>
        <div className="footer">
          Pick 4 Numbers that add up to{" "}
          {status === "new" ? "the target" : this.target} in 10 seconds.
          <h2>
            {this.state.status === "new"
              ? "Click start when ready"
              : this.state.status === "playing"
              ? this.state.remainingSeconds
              : this.state.status === "lost"
              ? "You lose!"
              : "You Win!!!"}
          </h2>
          <div className="gameButtons">
            <button
              id="start"
              className={this.state.status === "new" ? "visible" : "hidden"}
              onClick={this.startGame}
            >
              Start
            </button>
            <button
              id="reset"
              className={
                this.state.status === "lost" || this.state.status === "won"
                  ? "visible"
                  : "hidden"
              }
              onClick={this.props.onReset}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}
