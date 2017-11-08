import React, { Component } from "react";

export default class PoliticalEvent extends Component {
  render() {
    // console.log(this.props.event);
    const e = this.props.event;
    return (
      <div>
        <h3>{ e.entertainment }</h3>
      </div>
    )
  }
}
