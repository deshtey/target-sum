import React, { Component } from "react";

export default class Number extends Component {
  render() {
    return (
      <button
        className="number"
        style={{
          backgroundColor: this.props.active !== -1 ? "lightgreen" : "#eee"
        }}
        onClick={() => this.props.handleClick(this.props.id)}
        disabled={this.props.status !== "playing"}
      >
        {this.props.value}
      </button>
    );
  }
}
