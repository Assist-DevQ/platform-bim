import logo from '../assets/img/logo.svg';
import { Nav} from 'react-bootstrap';
import React, { Component } from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class NavBar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="p-3 mb-2 bg-dark text-white" dark expand="md" fixed="top">
        <MDBNavbarBrand>
          <strong><img src={logo} alt="" width="30" height="30" className="img-fluid"/>DevQ</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <Nav.Link href="/home">Home</Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/login">Login</Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
            </MDBNavItem>
          </MDBNavbarNav>
          
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavBar;
