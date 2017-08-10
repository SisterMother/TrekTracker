import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

//note: &#9776; is a special unicode value which renders to the 
//icon of the three horizonal bars representing the menu
const Nav = (props) => (
  <div className="nav">
    <ul>
      <div className="title">Trek Tracker</div>
      <div className="dropdown">
        <button className="dropbtn">&#9776;</button>
        <div className="dropdown-content">
          <div><Link style={{ textDecoration: 'none', color:'black' }} to='/upload'>Upload</Link></div>
          <div><Link style={{ textDecoration: 'none', color:'black' }} to='/profile'>Profile</Link></div>
          <div><Link style={{ textDecoration: 'none', color:'black' }} to='/logout'>Logout</Link></div>
        </div>
      </div>
    </ul>
  </div>
);

export default Nav;