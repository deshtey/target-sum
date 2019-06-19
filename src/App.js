import React, { Component } from "react";
import Game from "./components/Game";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { gameId: 0 };
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState(prevState => ({
      gameId: prevState.gameId + 1
    }));
  }
  render() {
    return (
      <div>
        <h1>Challenge Numbers Game</h1>
        <Game
          key={this.state.gameId}
          autoPlay={this.state.gameId > 0}
          size={6}
          sampleSize={4}
          onReset={this.resetGame}
        />
      </div>
    );
  }
}
