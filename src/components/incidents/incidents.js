import React from 'react';
import { observer, inject } from 'mobx-react';

import './incidents.sass';

import Header from '../header/header';
import IncidentsExerpt from './incidents-excerpt';

@inject('store', 'routing')
@observer
export default class Incidents extends React.Component {
  render() {
    return (
      <section>
        <Header match={this.props.match} />
        <div className="incident-data">
          <section className="incidents-top-info">
            {this._incidentsCount()}
          </section>
          <div className={this._incidentWrapClass()}>
            {this._showIncidents()}
            {this.props.store.filteredIncidents
              .slice()
              .map(incident => (
                <IncidentsExerpt key={incident.id} {...incident} />
              ))}
          </div>
        </div>
      </section>
    );
  }
  _showIncidents = () => {
    if (this.props.store.filteredIncidents.length === 0) {
      return (
        <div className="no-incident">
          <img
            src={`${process.env.PUBLIC_URL}/b1900-logo.png`}
            alt="BEECH 1900 Graphic"
          />
          <p>no incidents were found in your search</p>
        </div>
      );
    } else {
      return this.props.store.filteredIncidents
        .slice()
        .map(incident => <IncidentsExerpt key={incident.id} {...incident} />);
    }
  };

  _incidentWrapClass = () => {
    if (this.props.store.toggleSearch === true) {
      return 'incident_wrap incident_wrap_search';
    } else if (this.props.store.toggleMenu === true) {
      return 'incident_wrap incident_wrap_menu';
    } else {
      return 'incident_wrap';
    }
  };

  _incidentsCount = () => {
    if (this.props.store.filteredIncidents.slice().length > 0) {
      return (
        <p>
          Viewing {this.props.store.filteredIncidents.slice().length} Incidents
        </p>
      );
    } else {
      return <p>There are no incident results for your search.</p>;
    }
  };
}
