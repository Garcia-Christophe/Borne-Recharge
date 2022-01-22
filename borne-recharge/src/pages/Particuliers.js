import React, { Component } from "react";
import "../style/Particuliers.css";
import facebook from "../data/facebook.png";
import gmail from "../data/gmail.png";
import instagram from "../data/instagram.png";
import twitter from "../data/twitter.png";

export default class Particuliers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="div-particuliers">
        <h1 class="titre-particuliers">Particuliers</h1>

        <p class="paragraphe-abo">
          <u>Nos abonnements :</u>
          <br/><br/>

          Pour les particuliers Borne Recharge propose un système d'abonnement. Lorsque vous souscrivez à un abonnement 
          il est alors possible pour vous de charger votre véhicule sur les stations de recharge Borne Recharge. Le prix dépend des fonctionnalités que vous sélectionnez.
          Il est alors conseillé de choisir les caractéristiques en adéquation avec votre véhicule électrique. <br/>
          Pour souscrire à un abonnement veuillez vous rendre sur la page <a href="/Abonnements">Abonnements</a>.
          <br/><br/>
          <u>Installation de borne de recharge :</u>
          <br/><br/>

          Pour les particuliers Borne Recharge propose d'installer des bornes de recharges électriques directement chez vous. Chaque caractéristique de la borne vous est directement
          proposée sur la page <a href="/Bornes">Bornes</a>. Veillez à choisir un accès privé de préférence s'il s'agit d'une installation à domicile. Une fois la réservation faites sur la page Bornes
          vous serez directement contacté par e-mail et l'ensemble des informations concernant la démarche d'installation vous sera fournie accompagnée d'un devis.




        </p>
        

        <p></p>    
        <br/><br/><br/><br/>
        
        <h2 class="h2-particuliers">Nos réseaux sociaux</h2>
        <br/>

        <div class="social-banner">

          <a href="https://www.facebook.com"><img
                alt=""
                src={facebook}
                width="100"
                height="100"
                className="image1" 
              /></a>

          <a href="mailto: contact@borne-recharge.fr">
          <img
              alt=""
              src={gmail}
              width="100"
              height="100"
              className="image2"
              
            />{" "}</a>
          <a href="https://www.twitter.com">
          <img
              alt=""
              src={twitter}
              width="100"
              height="100"
              className="image3"
              
            />{"    "}</a>

          <a href="https://www.instagram.com">
          <img
                alt=""
                src={instagram}
                width="100"
                height="100"
                className="image4"
                
              />{"    "}
              </a>

        </div>


      </div>
    );
  }
}
