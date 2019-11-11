//import logo from '../assets/img/logo.svg';
import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top text-light">
        <a className="navbar-brand" href="/home"><strong className="logoColor">DevQ</strong></a> {/*<img src={logo} alt="" width="30" height="30" className="img-fluid" />*/}
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home"><i className="fa fa-home fa-lg"> Home</i><span className="sr-only">(current)</span></a>
            </li>
            {localStorage.getItem('user') ?
              <li className="nav-item">
                <a className="nav-link" href="/user"><i className="fa fa-user-circle fa-lg"> My Page</i></a>
              </li> :
              <li className="nav-item">
                <a className="nav-link" href="/login"><i className="fa fa-lock fa-lg"> Login</i></a>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
