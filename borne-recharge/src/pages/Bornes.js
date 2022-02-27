import React, { Component } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import "../style/Bornes.css";
import borneBlanche from "../data/borneBlanche.jpg";
import borneNoire from "../data/borneNoire.jpg";
import borneBleue from "../data/borneBleue.jpg";
import borneOrange from "../data/borneOrange.jpg";
import borneRouge from "../data/borneRouge.jpg";
import borneVerte from "../data/borneVerte.jpg";
import borneViolette from "../data/borneViolette.jpg";

export default class Bornes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borne: null,
      recharge: {
        idRecharge: -1,
        nomRecharge: { nom: "", prix: 0 },
        puissanceRecharge: 0,
        typeCourant: { nom: "", prix: 0 },
        accesRecharge: { nom: "", prix: 0 },
      },
      latBorne: 0,
      lngBorne: 0,
      couleurChoisie: {
        nom: "",
        prix: 0,
      },
      couleurs: [
        {
          nom: "Bleue",
          prix: 100,
        },
        {
          nom: "Orange",
          prix: 100,
        },
        {
          nom: "Rouge",
          prix: 100,
        },
        {
          nom: "Verte",
          prix: 100,
        },
        {
          nom: "Violette",
          prix: 100,
        },
        {
          nom: "Blanche",
          prix: 0,
        },
        {
          nom: "Noire",
          prix: 100,
        },
      ],
      nomsRecharges: [
        { nom: "Standard", prix: 1000 },
        { nom: "Accélérée", prix: 2000 },
      ],
      puissanceMinRecharge: 3,
      puissanceMaxRecharge: 25,
      typesCourantRecharges: [
        { nom: "Alternatif monophasé", prix: 500 },
        { nom: "Alternatif triphasé", prix: 1000 },
        { nom: "Continu", prix: 1500 },
      ],
      accesRecharges: [
        { nom: "Gratuit", prix: 500 },
        { nom: "Payant", prix: 1000 },
      ],
      accesBorne: [
        { nom: "Privé", prix: 1000 },
        { nom: "Public", prix: 250 },
      ],
      accesBorneChoisi: { nom: "", prix: 0 },
      email: "",
      mdp: "",
      mailEnvoye: false,
    };

    this.handleConfirmerCommande = this.handleConfirmerCommande.bind(this);
  }

  componentDidMount() {
    this.setState({
      recharge: {
        idRecharge: -1,
        nomRecharge: this.state.nomsRecharges[0],
        puissanceRecharge: this.state.puissanceMinRecharge,
        typeCourant: this.state.typesCourantRecharges[0],
        accesRecharge: this.state.accesRecharges[0],
      },
      couleurChoisie: this.state.couleurs[0],
      accesBorneChoisi: this.state.accesBorne[0],
    });
  }

  handleChangePuissanceRecharge(event) {
    let recharge = this.state.recharge;
    recharge.puissanceRecharge =
      event.target.validity.valid &&
      parseInt(event.target.value) >= this.state.puissanceMinRecharge &&
      parseInt(event.target.value) <= this.state.puissanceMaxRecharge
        ? parseInt(event.target.value)
        : this.state.recharge.puissanceRecharge;
    this.setState({
      recharge,
    });
  }

  /**
   * Envoie le mail à l'adresse fournie
   */
  handleConfirmerCommande(e) {
    e.preventDefault();

    // Affichage du texte de confirmation
    this.setState({ mailEnvoye: true });
  }

  render() {
    return (
      <div>
        <h1 className="titre-bornes">Bornes</h1>

        <div className="div-bornes-contenu">
          {/* Image de la borne */}
          <div className="bornes-image-borne">
            <img
              alt="Borne à commander"
              src={
                this.state.couleurChoisie.nom === "Bleue"
                  ? borneBleue
                  : this.state.couleurChoisie.nom === "Orange"
                  ? borneOrange
                  : this.state.couleurChoisie.nom === "Rouge"
                  ? borneRouge
                  : this.state.couleurChoisie.nom === "Verte"
                  ? borneVerte
                  : this.state.couleurChoisie.nom === "Violette"
                  ? borneViolette
                  : this.state.couleurChoisie.nom === "Blanche"
                  ? borneBlanche
                  : borneNoire
              }
              width="125"
              height="425"
            />
          </div>

          <div className="div-selections-bornes">
            <h4 className="bornes-sous-titre">Détails de la borne</h4>

            {/* Détails modifiables de la borne */}
            <div>
              {/* Liste déroulante des noms de la recharge */}
              <div className="div-selection">
                <p>Nom de la recharge</p>
                <Dropdown>
                  {/* Nom de la recharge */}
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
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
                  Puissance de la recharge <br />
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
                        recharge.puissanceRecharge = parseInt(
                          event.target.value
                        );
                        this.setState({ recharge });
                      }
                    }}
                    value={this.state.recharge.puissanceRecharge}
                  />
                </div>
              </div>

              {/* Liste déroulante des types de courant des recharges */}
              <div className="div-selection">
                <p>Type de courant de la recharge</p>
                <Dropdown>
                  {/* Type de courant la recharge */}
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
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

              {/* Liste déroulante des accès de recharges */}
              <div className="div-selection">
                <p>Accès de la recharge</p>
                <Dropdown>
                  {/* Accès de la recharge */}
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    {this.state.recharge.accesRecharge.nom}
                  </Dropdown.Toggle>

                  {/* Menu déroulant des accès de recharges */}
                  <Dropdown.Menu>
                    {this.state.accesRecharges.map((acces) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            let recharge = this.state.recharge;
                            recharge.accesRecharge = acces;
                            this.setState({ recharge });
                          }}
                        >
                          {acces.nom}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Coordonnées de la borne */}
              <div className="div-selection">
                <p>
                  Latitude de la borne
                  <br />
                  Longitude de la borne
                </p>
                <div className="">
                  <input
                    className="div-puissance-input"
                    type="number"
                    step="0.00001"
                    size={5}
                    onInput={(event) =>
                      this.setState({
                        latBorne: parseFloat(event.target.value),
                      })
                    }
                    value={this.state.latBorne}
                  />
                  <input
                    className="div-puissance-input"
                    type="number"
                    step="0.00001"
                    size={5}
                    onInput={(event) =>
                      this.setState({
                        lngBorne: parseFloat(event.target.value),
                      })
                    }
                    value={this.state.lngBorne}
                  />
                </div>
              </div>

              {/* Liste déroulante des couleurs de la borne */}
              <div className="div-selection">
                <p>Couleur de la borne</p>
                <Dropdown>
                  {/* Accès de la recharge */}
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    {this.state.couleurChoisie.nom}
                  </Dropdown.Toggle>

                  {/* Menu déroulant des couleurs disponibles */}
                  <Dropdown.Menu>
                    {this.state.couleurs.map((couleur) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            this.setState({ couleurChoisie: couleur });
                          }}
                        >
                          {couleur.nom}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Boutons d'accès de la borne */}
              <div className="div-boutons-acces">
                <p>Accès de la borne</p>
                <Button
                  className="button-acces"
                  variant={
                    this.state.accesBorneChoisi === this.state.accesBorne[0]
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => {
                    this.setState({
                      accesBorneChoisi: this.state.accesBorne[0],
                    });
                  }}
                >
                  {this.state.accesBorne[0].nom}
                </Button>
                <Button
                  className="button-acces"
                  variant={
                    this.state.accesBorneChoisi === this.state.accesBorne[1]
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => {
                    this.setState({
                      accesBorneChoisi: this.state.accesBorne[1],
                    });
                  }}
                >
                  {this.state.accesBorne[1].nom}
                </Button>
              </div>
            </div>

            {/* Montant total */}
            <div className="div-montant-total-bornes">
              <p>
                <b>Montant total :</b>
              </p>
              <p>
                {this.state.recharge.nomRecharge.prix +
                  this.state.recharge.puissanceRecharge * 100 +
                  this.state.recharge.typeCourant.prix +
                  this.state.recharge.accesRecharge.prix +
                  this.state.accesBorneChoisi.prix +
                  this.state.couleurChoisie.prix}{" "}
                €
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bornes-formulaire">
            <h4 className="bornes-sous-titre">Formulaire</h4>

            {/* Contenu formulaire */}
            <div className="formulaire-contenu">
              <p>
                Veuillez posséder un compte chez <b>Borne Recharge</b> avant de
                commander. <a href="/Abonnements">Voir plus</a>
              </p>

              <Form className="formulaire-inputs">
                <Form.Group controlId="form.Email">
                  <Form.Label>Adresse mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="nom@exemple.com"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlID="form.Password">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Votre mot de passe sécurisé"
                    onChange={(event) =>
                      this.setState({ mdp: event.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="form.Textarea">
                  <Form.Label>Commentaire sur la commande</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button
                  className="button-confirmation-commande"
                  color="#de8516"
                  onClick={this.handleConfirmerCommande}
                >
                  Confirmer
                </Button>
              </Form>

              {this.state.mailEnvoye && (
                <p className="texte-mail-envoye">
                  Mail envoyé ! Merci pour votre commande. <br />
                  Les instructions pour le réglement se trouveront dans le mail.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
