import React, { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../data/logo.png";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          {/* Logo et Nom de l'application */}
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block"
            />{" "}
            Borne Recharge
          </Navbar.Brand>

          {/* Reste de la barre de navigation */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {/* Pages secondaires */}
            <Nav>
              <Nav.Link href="/">Accueil</Nav.Link>
              <Nav.Link href="/Informations">Informations</Nav.Link>
              <Nav.Link href="/Abonnements">Abonnements</Nav.Link>
              <Nav.Link href="/Bornes">Bornes</Nav.Link>
              <NavDropdown title="Clients" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Professionnels">
                  Professionnels
                </NavDropdown.Item>
                <NavDropdown.Item href="/Particuliers">
                  Particuliers
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
