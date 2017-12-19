import React from 'react';
import Routes from '../routes';
import Home from './Home';
import { Link } from 'react-router-dom';



class Header extends React.Component {

  render() {
    return (
      <header>
        <div className="container">
          <div className="header-wrap">
            <div id="logo-wrap">
              <Link to={'/'}><img src="assets/images/cultivato.jpg" /></Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
