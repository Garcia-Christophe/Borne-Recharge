import React, { Component } from "react";
import "../style/Recharge.css";

export default class Recharge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="div-principal-recharge">
        <p id="div-principal-recharge-recharge">
          <b>Recharge {this.props.nomRecharge}</b>
        </p>
        <p>Puissance : {this.props.puissanceRecharge}</p>
        <p>Type courant : {this.props.typeCourant}</p>
        <p>Accès : {this.props.accesRecharge}</p>
      </div>
    );
  }
}
