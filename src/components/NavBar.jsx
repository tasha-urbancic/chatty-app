import React, { Component, PropTypes } from 'react';

const name = 'Chatty';

class NavBar extends React.Component {
  static propTypes = {
    numberConnected: PropTypes.number
  };

  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>
          {name}
        </a>
        <p className='users-online'>{`${this.props.numberConnected} users online`}</p>
      </nav>
    );
  }
}

export default NavBar;
