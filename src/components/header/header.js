import React from 'react';
import { observer, inject } from 'mobx-react';

import './header.sass';

import Logo from './logo/logo';
import AirplaneSearch from './search/airplaneSearch';
import IncidentSearch from './search/incidentSearch';
import FactSearch from './search/factSearch';
import AboutSearch from './search/aboutSearch';
import Nav from './nav/nav';

@inject('store', 'routing') @observer
export default class Header extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div className="header">
        <div className="nav-container">
          <Nav />
          <Logo />
        </div>
        {this.displaySearch()}
      </div>
    );
  }

  displaySearch() {
    if (this.props.match.path === "/incidents") {
      return <IncidentSearch />;
    } else if (this.props.match.path === "/facts") {
      return <FactSearch />;
    } else if (this.props.match.path === "/about") {
      return <AboutSearch />;
    } else {
      return <AirplaneSearch history={this.props.history} />;
    }
  }
}
