import React, { Component } from "react";

const name = "Chatty";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          {name}
        </a>
      </nav>
    );
  }
}

export default NavBar;
