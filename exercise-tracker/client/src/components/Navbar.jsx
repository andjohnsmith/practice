import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            Exercise Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={
              'collapse navbar-collapse' +
              (this.state.isExpanded ? ' show' : '')
            }
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  exact
                  activeClassName="active"
                >
                  My Exercises
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/exercises/add" className="nav-link">
                  Log an Exercise
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/users/" className="nav-link">
                  Create a User
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
