import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

//&#9776; is a special unicode value which renders to the 
//icon of the three horizonal bars representing the menu
const Nav = (props) => (
  <div className="nav">
    <ul>
      <div className="title">Trek Tracker</div>
      <div className="dropdown">
        <button className="dropbtn">&#9776;</button>
        <div className="dropdown-content">
          <Link to='/upload'><a>Upload</a></Link>
          <Link to='/profile'><a>Profile</a></Link>
        </div>
      </div>
    </ul>
  </div>
);

export default Nav;