import { createConnection } from "mariadb";
import express, { json } from "express";
import cors from "cors";
import CryptoJS from "crypto-js";
const app = express();
require("dotenv").config();

// Middleware
app.use(json());
app.use(cors({ origin: "*" }));

// Écoute du serveur
app.listen(8080, () => {
  console.log("Serveur à l'écoute");
});

// Connexion à la base de données
createConnection({
  host: "obiwan2.univ-brest.fr",
  user: "zgarciach",
  password: "h6wdk9yr",
  database: "zil3-zgarciach",
})
  .then((conn) => {
    // ========================================
    // Méthodes GET
    // =========================================

    // Récupérer tous les utilisateurs
    app.get("/utilisateur", (req, res) => {
      const query = "select * from UTILISATEUR";
      requete(conn, res, query);
    });

    // Récupérer toutes les recharges
    app.get("/recharge", (req, res) => {
      const query = "select * from RECHARGE";
      requete(conn, res, query);
    });

    // Récupérer toutes les bornes
    app.get("/borne", (req, res) => {
      const query = "select * from BORNE";
      requete(conn, res, query);
    });

    // Récupérer tous les techniciens
    app.get("/technicien", (req, res) => {
      const query = "select * from TECHNICIEN";
      requete(conn, res, query);
    });

    // Récupérer un utilisateur en particulier
    app.get("/utilisateur/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from UTILISATEUR where idUtilisateur = " + id;
      requete(conn, res, query);
    });

    // Récupérer une recharge en particulier
    app.get("/recharge/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from RECHARGE where idRecharge = " + id;
      requete(conn, res, query);
    });

    // Récupérer une borne en particulier
    app.get("/borne/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from BORNE where idBorne = " + id;
      requete(conn, res, query);
    });

    // Récupérer un teechnicien en particulier
    app.get("/technicien/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "select * from TECHNICIEN where idTechnicien = " + id;
      requete(conn, res, query);
    });

    // ========================================
    // Méthodes POST
    // =========================================

    // Insérer un nouvel utilisateur
    app.post("/utilisateur", (req, res) => {
      const query =
        "INSERT INTO UTILISATEUR (idUtilisateur, profilUtilisateur, nomUtilisateur, prenomUtilisateur, email, motDePasse, montant, pointsFidelite) VALUES ('" +
        req.body.idUtilisateur +
        "', '" +
        req.body.profilUtilisateur +
        "', '" +
        req.body.nomUtilisateur +
        "', '" +
        req.body.prenomUtilisateur +
        "', '" +
        req.body.email +
        "', '" +
        CryptoJS.MD5(req.body.motDePasse + req.body.email) + // hachage avec l'algo md5, salage avec l'email
        "', '" +
        req.body.montant +
        "', '" +
        req.body.pointsFidelite +
        "');";
      requete(conn, res, query);
    });

    // Insérer une nouvelle recharge
    app.post("/recharge", (req, res) => {
      const query =
        "INSERT INTO RECHARGE (idRecharge, nomRecharge, puissanceRecharge, typeCourant, accesRecharge) VALUES ('" +
        req.body.idRecharge +
        "', '" +
        req.body.nomRecharge +
        "', '" +
        req.body.puissanceRecharge +
        "', '" +
        req.body.typeCourant +
        "', '" +
        req.body.accesRecharge +
        "');";
      requete(conn, res, query);
    });

    // Insérer une nouvelle borne
    app.post("/borne", (req, res) => {
      const query =
        "INSERT INTO BORNE (idBorne, longitude, latitude, accesBorne) VALUES ('" +
        req.body.idBorne +
        "', '" +
        req.body.longitude +
        "', '" +
        req.body.latitude +
        "', '" +
        req.body.accesBorne +
        "');";
      requete(conn, res, query);
    });

    // Insérer un nouveau technicien
    app.post("/technicien", (req, res) => {
      const query =
        "INSERT INTO TECHNICIEN (idTechnicien, nomTechnicien, prenomTechnicien) VALUES ('" +
        req.body.idTechnicien +
        "', '" +
        req.body.nomTechnicien +
        "', '" +
        req.body.prenomTechnicien +
        "');";
      requete(conn, res, query);
    });

    // ========================================
    // Méthodes PUT
    // =========================================

    // Mettre à jour les informations d'un utilisateur
    app.put("/utilisateur/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let profilUtilisateur =
        req.body.profilUtilisateur !== undefined
          ? " profilUtilisateur = '" + req.body.profilUtilisateur + "' "
          : "";

      let nomUtilisateur = "";
      if (req.body.nomUtilisateur !== undefined) {
        if (profilUtilisateur !== "")
          nomUtilisateur =
            ", nomUtilisateur = '" + req.body.nomUtilisateur + "'";
        else
          nomUtilisateur =
            " nomUtilisateur = '" + req.body.nomUtilisateur + "'";
      }

      let prenomUtilisateur = "";
      if (req.body.prenomUtilisateur !== undefined) {
        if (profilUtilisateur !== "" || nomUtilisateur !== "")
          prenomUtilisateur =
            ", prenomUtilisateur = '" + req.body.prenomUtilisateur + "'";
        else
          prenomUtilisateur =
            " prenomUtilisateur = '" + req.body.prenomUtilisateur + "'";
      }

      let email = "";
      if (req.body.email !== undefined) {
        if (
          profilUtilisateur !== "" ||
          nomUtilisateur !== "" ||
          prenomUtilisateur !== ""
        )
          email = ", email = '" + req.body.email + "'";
        else email = " email = '" + req.body.email + "'";
      }

      let motDePasse = "";
      if (req.body.motDePasse !== undefined) {
        if (
          profilUtilisateur !== "" ||
          nomUtilisateur !== "" ||
          prenomUtilisateur !== "" ||
          email !== ""
        )
          motDePasse =
            ", motDePasse = '" + CryptoJS.MD5(req.body.motDePasse) + "'";
        // hachage du mot de passe
        else
          motDePasse =
            " motDePasse = '" + CryptoJS.MD5(req.body.motDePasse) + "'"; // hachage du mot de passe
      }

      let montant = "";
      if (req.body.montant !== undefined) {
        if (
          profilUtilisateur !== "" ||
          nomUtilisateur !== "" ||
          prenomUtilisateur != "" ||
          email != "" ||
          motDePasse !== ""
        )
          montant = ", montant = '" + req.body.montant + "'";
        else montant = " montant = '" + req.body.montant + "'";
      }

      let pointsFidelite = "";
      if (req.body.pointsFidelite !== undefined) {
        if (
          profilUtilisateur !== "" ||
          nomUtilisateur !== "" ||
          prenomUtilisateur != "" ||
          email != "" ||
          motDePasse !== "" ||
          montant !== ""
        )
          pointsFidelite =
            ", pointsFidelite = '" + req.body.pointsFidelite + "'";
        else
          pointsFidelite =
            " pointsFidelite = '" + req.body.pointsFidelite + "'";
      }

      let idUtilisateur = " WHERE idUtilisateur = " + id + ";";
      if (
        profilUtilisateur !== "" ||
        nomUtilisateur !== "" ||
        prenomUtilisateur != "" ||
        email != "" ||
        motDePasse !== "" ||
        montant !== "" ||
        pointsFidelite !== ""
      ) {
        query =
          "UPDATE UTILISATEUR SET" +
          profilUtilisateur +
          nomUtilisateur +
          prenomUtilisateur +
          email +
          motDePasse +
          montant +
          pointsFidelite +
          idUtilisateur;
      }

      requete(conn, res, query);
    });

    // Mettre à jour les informations d'une recharge
    app.put("/recharge/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let nomRecharge =
        req.body.nomRecharge !== undefined
          ? " nomRecharge = '" + req.body.nomRecharge + "' "
          : "";

      let puissanceRecharge = "";
      if (req.body.puissanceRecharge !== undefined) {
        if (nomrecharge !== "")
          puissanceRecharge =
            ", puissanceRecharge = '" + req.body.puissanceRecharge + "'";
        else
          puissanceRecharge =
            " puissanceRecharge = '" + req.body.puissanceRecharge + "'";
      }

      let typeCourant = "";
      if (req.body.typeCourant !== undefined) {
        if (nomRecharge !== "" || puissanceRecharge !== "")
          typeCourant = ", typeCourant = '" + req.body.typeCourant + "'";
        else typeCourant = " typeCourant = '" + req.body.typeCourant + "'";
      }

      let accesRecharge = "";
      if (req.body.accesRecharge !== undefined) {
        if (nomRecharge !== "" || puissanceRecharge !== "" || typeCourant != "")
          accesRecharge = ", accesRecharge = '" + req.body.accesRecharge + "'";
        else
          accesRecharge = " accesRecharge = '" + req.body.accesRecharge + "'";
      }

      let idRecharge = " WHERE idRecharge = " + id + ";";
      if (
        nomRecharge !== "" ||
        puissanceRecharge !== "" ||
        typeCourant !== "" ||
        accesRecharge != ""
      ) {
        query =
          "UPDATE RECHARGE SET" +
          nomRecharge +
          puissanceRecharge +
          typeCourant +
          accesRecharge +
          idRecharge;
      }

      requete(conn, res, query);
    });

    // Mettre à jour les informations d'une borne
    app.put("/borne/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let longitude =
        req.body.longitude !== undefined
          ? " longitude = '" + req.body.longitude + "' "
          : "";

      let latitude = "";
      if (req.body.latitude !== undefined) {
        if (longitude !== "")
          latitude = ", latitude = '" + req.body.latitude + "'";
        else latitude = " latitude = '" + req.body.latitude + "'";
      }

      let accesBorne = "";
      if (req.body.accesBorne !== undefined) {
        if (longitude !== "" || latitude !== "")
          accesBorne = ", accesBorne = '" + req.body.accesBorne + "'";
        else accesBorne = " accesBorne = '" + req.body.accesBorne + "'";
      }

      let idUFR = " WHERE idBorne = " + id + ";";
      if (longitude !== "" || latitude !== "" || accesBorne !== "") {
        query =
          "UPDATE BORNE SET" + longitude + latitude + accesBorne + idBorne;
      }

      requete(conn, res, query);
    });

    // Mettre à jour les informations d'un technicien
    app.put("/technicien/:id", (req, res) => {
      const id = parseInt(req.params.id);
      var query = "";

      let nomTechnicien =
        req.body.nomTechnicien !== undefined
          ? " nomTechnicien = '" + req.body.nomTechnicien + "' "
          : "";

      let prenomTechnicien = "";
      if (req.body.prenomTechnicien !== undefined) {
        if (nomTechnicien !== "")
          prenomTechnicien =
            ", prenomTechnicien = '" + req.body.prenomTechnicien + "'";
        else
          prenomTechnicien =
            " prenomTechnicien = '" + req.body.prenomTechnicien + "'";
      }

      let idTechnicien = " WHERE idTechnicien = " + id + ";";
      if (nomTechnicien !== "" || prenomTechnicien !== "") {
        query =
          "UPDATE TECHNICIEN SET" +
          nomTechnicien +
          prenomTechnicien +
          idTechnicien;
      }

      requete(conn, res, query);
    });

    // ========================================
    // Méthodes DELETE
    // =========================================

    // Supprimer un utilisateur
    app.delete("/utilisateur/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query =
        "DELETE FROM UTILISATEUR WHERE idUtilisateur = '" + id + "';";
      requete(conn, res, query);

      // supprimer les lignes correspondantes dans les tables liaison
      const query =
        "DELETE FROM LIAISON_UTILISATEUR_BORNE WHERE idUtilisateur = '" +
        id +
        "';";
      requete(conn, res, query);
    });

    // Supprimer une recharge
    app.delete("/recharge/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "DELETE FROM RECHARGE WHERE idRecharge = '" + id + "';";
      requete(conn, res, query);

      // supprimer les lignes correspondantes dans la table liaison
      const query =
        "DELETE FROM LIAISON_BORNE_RECHARGE WHERE idRecharge = '" + id + "';";
      requete(conn, res, query);
    });

    // Supprimer une borne
    app.delete("/borne/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "DELETE FROM BORNE WHERE idBorne = '" + id + "';";
      requete(conn, res, query);

      // supprimer les lignes correspondantes dans les tables liaison
      const query =
        "DELETE FROM LIAISON_BORNE_RECHARGE WHERE idBorne = '" + id + "';";
      requete(conn, res, query);

      const query =
        "DELETE FROM LIAISON_UTILISATEUR_BORNE WHERE Borne_idBorne = '" +
        id +
        "';";
      requete(conn, res, query);
    });

    // Supprimer un technicien
    app.delete("/technicien/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const query = "DELETE FROM TECHNICIEN WHERE idTechnicien = '" + id + "';";
      requete(conn, res, query);
    });
  })
  .catch((err) => {
    // En cas d'erreur : affiche l'erreur
    console.log(err);
  });

/**
 * La fonction permettant d'exécuter la requête sur la base de données.
 */
function requete(conn, res, query) {
  conn
    .query(query)
    .then((rows) => {
      res.status(200).json(rows);
      console.log(rows);
    })
    .catch((err) => {
      console.log(err);
    });
}
