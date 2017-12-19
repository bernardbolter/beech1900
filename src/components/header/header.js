import React from 'react';
import { observer, inject } from 'mobx-react';

import './header.sass';

import Logo from './logo/logo';
import HomeSearch from './search/homeSearch';
import AirplaneSearch from './search/airplaneSearch';
import IncidentSearch from './search/incidentSearch';
import FactSearch from './search/factSearch';
import AboutSearch from './search/aboutSearch';
import Nav from './nav/nav';

@inject('store', 'routing') @observer
export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <div className="nav-container">
          <Nav match={this.props.match} />
          <Logo match={this.props.match} />
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
    } else if (this.props.match.path === '/') {
      return <HomeSearch />;
    } else if (this.props.match.path === 'airplanes') {
      return <AirplaneSearch history={this.props.history} />
    } else {
      return <AirplaneSearch history={this.props.history} />;
    }
  }
}
