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
          {this.props.store.filteredIncidents.slice().map( incident => (
                <IncidentsExerpt key={incident.id} {...incident} />
              ))
            }
        </div>
      </section>
    );
  }

  _incidentsCount = () => {
    if (this.props.store.filteredIncidents.slice().length > 0) {
      return <p>Viewing {this.props.store.filteredIncidents.slice().length} Incidents</p>;
    } else {
      return <p>There are no incident results for your search.</p>;
    }
  }
}
