import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "../style/Map.css";
import Borne from "./Borne";
import BarreRecherche from "../composants/BarreRecherche";
import markerOrange from "../data/markerOrange.png";
import markerBlue from "../data/markerBlue.png";
import Recharge from "./Recharge";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [{ lat: 46.632339, lng: 2.476532 }], // centre de la france
      places: [],
      zoom: 6,
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      address: "",
      lat: null,
      lng: null,
      bornes: [
        {
          idBorne: -1,
          lat: 46.632339,
          lng: 2.476532,
          recharges: [],
          clicked: false,
        },
      ],
      borneCliquee: null,
    };

    this.onClickMarker = this.onClickMarker.bind(this);
  }

  componentDidMount() {
    // Récupère toutes les bornes de la base de données
    let bornes = [];
    fetch("http://localhost:8080/borne")
      .then((res) => res.json())
      .then(
        (result) => {
          // On n'affiche pas les bornes privées (on garde juste les bornes publiques)
          result.map((borne) => {
            if (borne.accesBorne.toUpperCase() === "PUBLIC") {
              bornes.push({
                idBorne: borne.idBorne,
                lng: borne.longitude,
                lat: borne.latitude,
                recharges: [],
                clicked: false,
              });
            }

            return borne;
          });

          // Récupère toutes les recharges de la base de données
          let recharges = [];
          fetch("http://localhost:8080/recharge")
            .then((res) => res.json())
            .then(
              (result) => {
                result.map((recharge) => {
                  recharges.push({
                    idRecharge: recharge.idRecharge,
                    nomRecharge: recharge.nomRecharge,
                    puissanceRecharge: recharge.puissanceRecharge,
                    typeCourant: recharge.typeCourant,
                    accesRecharge: recharge.accesRecharge,
                  });

                  return recharge;
                });

                // Récupère toutes les liaisons borne/recharge de la base de données
                fetch("http://localhost:8080/liaison_borne_recharge")
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      // Attribution des recharges à chacune des bornes
                      result.map((liaison) => {
                        let borne = bornes.find(
                          (b) => b.idBorne === liaison.idBorne
                        );

                        // Si ce n'est pas une borne privée
                        if (borne !== undefined) {
                          let recharge = recharges.find(
                            (r) => r.idRecharge === liaison.idRecharge
                          );

                          borne.recharges.push(recharge);
                        }

                        return liaison;
                      });

                      this.setState({ bornes });
                    },
                    (error) => {
                      console.log("Erreur /liaison_borne_recharge : " + error);
                    }
                  );
              },
              (error) => {
                console.log("Erreur /recharge : " + error);
              }
            );
        },
        (error) => {
          console.log("Erreur /borne : " + error);
        }
      );
  }

  componentWillMount() {
    this.setCurrentLocation();
  }

  /**
   * Vérifie si l'api est bien chargée.
   * @param {*} map
   * @param {*} maps
   */
  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };

  /**
   * Adapte la map sur le lieu choisi.
   *
   * @param place place choisie par l'utilisateur
   */
  addPlace = (place) => {
    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  /**
   * Génère une adresse écrite de la place recherchée.
   */
  _generateAddress() {
    const geocoder = new this.state.mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  /**
   * Met à jour la localisation avec les coordonnées de la localisation actuelle.
   */
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
        });
      });
    }
  }

  /**
   * Met à jour le status "clicked" de toutes les bornes.
   * Vrai sur la borne cliquée, si et seulement si elle ne l'était pas déjà, faux sinon.
   * Faux sur toutes les autres bornes.
   *
   * @param idBorne id de la borne cliquée
   */
  onClickMarker(idBorne) {
    let bornesAJour = this.state.bornes;
    bornesAJour.map(
      (borne) =>
        (borne.clicked = idBorne === borne.idBorne ? !borne.clicked : false)
    );
    let borne = bornesAJour.find((borne) => borne.idBorne === idBorne);
    this.setState({
      bornes: bornesAJour,
      borneCliquee: borne.clicked ? borne : null,
    });
  }

  render() {
    return (
      <div className="div-principal-map">
        {/* Barre de recherche */}
        {this.state.mapApiLoaded && (
          <div>
            <BarreRecherche
              map={this.state.mapInstance}
              mapApi={this.state.mapApi}
              addplace={this.addPlace}
            />
          </div>
        )}

        <div className="ensemble-map">
          {/* Liste des recharges de la borne sélectionnée */}
          <div className="liste-recharges-map">
            {this.state.borneCliquee !== null && (
              <div className="titre-liste-bornes-map">
                <div className="liste-recharges-map-titres">
                  <h4>Borne {this.state.borneCliquee.idBorne}</h4>
                  <p>
                    <b>
                      {" "}
                      {this.state.borneCliquee.recharges.length}{" "}
                      {this.state.borneCliquee.recharges.length > 1
                        ? "recharges disponibles"
                        : "recharge disponible"}
                    </b>
                  </p>
                </div>

                {/* Recharges */}
                <div className="liste-recharges-map-recharges">
                  {this.state.borneCliquee.recharges.map((recharge) => (
                    <Recharge
                      idRecharge={recharge.idRecharge}
                      nomRecharge={recharge.nomRecharge}
                      puissanceRecharge={recharge.puissanceRecharge}
                      typeCourant={recharge.typeCourant}
                      accesRecharge={recharge.accesRecharge}
                    />
                  ))}
                </div>
              </div>
            )}
            {this.state.borneCliquee === null && (
              <div className="titre-liste-aucuneBorne-map">
                <h4 className="titre-liste-aucuneBorne-map-mot">Aucune</h4>
                <h4 className="titre-liste-aucuneBorne-map-mot">Borne</h4>
                <h4 className="titre-liste-aucuneBorne-map-mot">
                  Sélectionnée
                </h4>
              </div>
            )}
          </div>

          {/* Google Map */}
          <div className="map">
            <GoogleMapReact
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                this.apiHasLoaded(map, maps)
              }
              bootstrapURLKeys={{
                key: "AIzaSyD5PztRzJq_ii80WpXSeS2skNr9dmKF4KA",
                libraries: ["places", "geometry"],
              }}
            >
              {/* Liste des bornes */}
              {this.state.bornes.map((borne) => (
                <Borne
                  lat={borne.lat}
                  lng={borne.lng}
                  marker={borne.clicked ? markerOrange : markerBlue}
                  onClickMarker={() => this.onClickMarker(borne.idBorne)}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}
