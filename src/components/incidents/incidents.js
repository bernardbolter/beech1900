import React from 'react';
import { observer, inject} from 'mobx-react';

import './incidents.sass';

import Header from '../header/header';
import IncidentsExerpt from './incidents-excerpt';

@inject('store', 'routing') @observer
export default class Incidents extends React.Component {

  render() {
    console.log(this.props.history);
    return (
      <section>
      <Header match={this.props.match}/>
        <div className="incident-data">
          <section className="incidents-top-info">
            {this._incidentsCount()}
          </section>
          <div className={this._incidentWrapClass()}>
          {this.props.store.filteredIncidents.slice().map( incident => (
                <IncidentsExerpt key={incident.id} {...incident} />
              ))
            }
          </div>
        </div>
      </section>
    );
  }

  _incidentWrapClass = () => {
    if (this.props.store.toggleSearch === true) {
      return 'incident_wrap incident_wrap_search'
    } else if (this.props.store.toggleMenu === true) {
      return 'incident_wrap incident_wrap_menu'
    } else {
      return 'incident_wrap'
    }
  }

  _incidentsCount = () => {
    if (this.props.store.filteredIncidents.slice().length > 0) {
      return <p>Viewing {this.props.store.filteredIncidents.slice().length} Incidents</p>;
    } else {
      return <p>There are no incident results for your search.</p>;
    }
  }
}
