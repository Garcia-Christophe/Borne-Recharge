import React, { Component } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "../style/Abonnements.css";
import logoCB from "../data/logoCB.png";

export default class Abonnements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recharge: {
        idRecharge: -1,
        nomRecharge: { nom: "", prix: 0 },
        puissanceRecharge: 0,
        typeCourant: { nom: "", prix: 0 },
        engagement: { nom: "", prix: 0 },
      },

      paymentOK: false,

      puissanceMinRecharge: 3,
      puissanceMaxRecharge: 25,

      engagementAbonnement: [
        { nom: "1 Mois", prix: 8 },
        { nom: "3 Mois", prix: 6 },
        { nom: "6 Mois", prix: 4 },
        { nom: "12 Mois", prix: 0 },
      ],
      nomsRecharges: [
        { nom: "Standard", prix: 20 },
        { nom: "Accélérée", prix: 30 },
      ],
      typesCourantRecharges: [
        { nom: "Alternatif monophasé", prix: 20 },
        { nom: "Alternatif triphasé", prix: 35 },
        { nom: "Continu", prix: 40 },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      recharge: {
        idRecharge: -1,
        nomRecharge: this.state.nomsRecharges[0],
        puissanceRecharge: this.state.puissanceMinRecharge,
        typeCourant: this.state.typesCourantRecharges[0],
        engagement: this.state.engagementAbonnement[0],
      },
    });
  }

  render() {
    return (
      <div>
        <h1 className="titre-abonnements">Abonnements</h1>

        <div className="global">
          {/* Liste des abonnement à gauche */}
          <div className="div-liste-abonnements">
            <h4 className="abonnements-sous-titre">Détails de l'abonnement</h4>

            <div className="div-selection">
              <p>Type de recharge</p>
              <Dropdown>
                {/* Type de la recharge */}
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  {this.state.recharge.nomRecharge.nom}
                </Dropdown.Toggle>

                {/* Menu déroulant des noms de recharges */}
                <Dropdown.Menu>
                  {this.state.nomsRecharges.map((nom) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          let recharge = this.state.recharge;
                          recharge.nomRecharge = nom;
                          this.setState({ recharge });
                        }}
                      >
                        {nom.nom}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Puissance de la recharge */}
            <div className="div-selection">
              <p>
                Puissance des recharges <br />
                (en KW, min=3 max=25)
              </p>
              <div className="input-puissance-boutons">
                <input
                  className="div-puissance-input"
                  type="number"
                  size={5}
                  onInput={(event) => {
                    if (
                      parseInt(event.target.value) >=
                        this.state.puissanceMinRecharge &&
                      parseInt(event.target.value) <=
                        this.state.puissanceMaxRecharge
                    ) {
                      let recharge = this.state.recharge;
                      recharge.puissanceRecharge = parseInt(event.target.value);
                      this.setState({ recharge });
                    }
                  }}
                  value={this.state.recharge.puissanceRecharge}
                />
              </div>
            </div>

            {/* Liste déroulante des types de courant des recharges */}
            <div className="div-selection">
              <p>Type de courant des recharges</p>
              <Dropdown>
                {/* Type de courant la recharge */}
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  {this.state.recharge.typeCourant.nom}
                </Dropdown.Toggle>

                {/* Menu déroulant des types de recharges */}
                <Dropdown.Menu>
                  {this.state.typesCourantRecharges.map((type) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          let recharge = this.state.recharge;
                          recharge.typeCourant = type;
                          this.setState({ recharge });
                        }}
                      >
                        {type.nom}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="div-selection">
              <p>Engagement de l'abonnement</p>
              <Dropdown>
                {/* Engagement de l'abonnement */}
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  {this.state.recharge.engagement.nom}
                </Dropdown.Toggle>

                {/* Menu déroulant des durées d'engagement */}
                <Dropdown.Menu>
                  {this.state.engagementAbonnement.map((duree) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          let recharge = this.state.recharge;
                          recharge.engagement = duree;
                          this.setState({ recharge });
                        }}
                      >
                        {duree.nom}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Montant total */}
            <div className="div-montant-total-bornes">
              <p>
                <b>Montant par mois :</b>
              </p>
              <p>
                {this.state.recharge.nomRecharge.prix +
                  this.state.recharge.puissanceRecharge * 3 +
                  this.state.recharge.typeCourant.prix +
                  this.state.recharge.engagement.prix}{" "}
                €
              </p>
            </div>
          </div>

          <div className="div-recap-abonnements">
            <h4 className="abonnements-sous-titre">
              Récapitulatif de l'abonnement choisi
            </h4>
            <div>
              <p>
                Type de recharge : <b>{this.state.recharge.nomRecharge.nom}</b>
              </p>
              <p>
                Puissance max de recharge :{" "}
                <b>{this.state.recharge.puissanceRecharge}</b>
              </p>
              <p>
                Type de courant des recharges :{" "}
                <b>{this.state.recharge.typeCourant.nom}</b>
              </p>
              <p>
                Engagement de l'abonnement :{" "}
                <b>{this.state.recharge.engagement.nom}</b>
              </p>

              <p>
                Montant par mois :
                <b>
                  {" "}
                  {this.state.recharge.nomRecharge.prix +
                    this.state.recharge.puissanceRecharge * 3 +
                    this.state.recharge.typeCourant.prix +
                    this.state.recharge.engagement.prix}
                </b>{" "}
                €
              </p>
            </div>
            <h4 className="abonnements-sous-titre">
              Paiement par carte bancaire
            </h4>
            <input
              type="text"
              placeholder="Numéro de carte"
              size="50"
              maxlength="16"
            ></input>
            <img
              alt=""
              src={logoCB}
              width="150"
              height="80"
              className="imageCB"
            />{" "}
            <br />
            <span class="expiration">
              <input
                id="expiration-date"
                type="text"
                name="month"
                placeholder="MM"
                maxlength="2"
                size="3"
              />
              <span>/</span>
              <input
                id="expiration-date"
                type="text"
                name="year"
                placeholder="YY"
                maxlength="2"
                size="3"
              />
            </span>
            {/* <input type="month" placeholder="Date d'expiration" size="30"></input> */}
            <input
              id="CVV"
              type="text"
              placeholder="CVV"
              size="4"
              maxLength="3"
            ></input>
            <br />
            <br />
            <Button onClick={() => this.setState({ paymentOK: true })}>
              Valider
            </Button>
            <br />
            <p>
              Suite au paiement, la somme indiqué sera prélevée chaque mois
              jusqu'à la fin de l'engagement.
            </p>
            {this.state.paymentOK && <b>Merci, le paiement à été effectué</b>}
          </div>
        </div>
      </div>
    );
  }
}
