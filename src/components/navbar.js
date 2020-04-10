import React, { Component } from "react";
import Logo from "../assets/logo.png";
import "../style/main.scss";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      is_login: false,
    };
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach((el) => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={Logo} id="nav-logo" />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start"></div>

          <div className="navbar-end">
              <a className="navbar-item">อะไรซักอย่าง</a>
              <a className="navbar-item">เดี๋ยวค่อยคิดอีกที</a>
              {this.state.is_login ? (
                <a href="#" className="navbar-item">
                  Log out
                </a>
              ) : (
                <div className="navbar-end">
                  <NavLink to="/login" activeClassName="navbar-item current" className="navbar-item">
                    Login
                  </NavLink>
                  <NavLink to="/signup" activeClassName="navbar-item current" className="navbar-item">
                    Sign-up
                  </NavLink>
                </div>
              )}

              {/* <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div> */}
          </div>
        </div>
      </nav>
    );
  }
}
