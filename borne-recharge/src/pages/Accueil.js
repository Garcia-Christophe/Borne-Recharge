import React, { Component } from "react";
import "../style/Accueil.css";
import Map from "../composants/Map";

export default class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="div-principal-accueil">
        {/* Carte des bornes de recharge */}
        <Map />
      </div>
    );
  }
}
