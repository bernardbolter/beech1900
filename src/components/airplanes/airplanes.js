import React from 'react';
import { observer, inject} from 'mobx-react';

import './airplanes.sass';

import Header from '../header/header';
import AirplaneExcerpt from './airplane-excerpt.js';

@inject('store', 'routing') @observer
export default class Airplanes extends React.Component {

  render() {
    return (
      <section>
      <Header match={this.props.match} history={this.props.history}/>
        <div className="airplane-data">
          <section className="airplane-top-info">
            {this._airplaneCount()}
          </section>
          <section className="airplane-data-headers">
            <div className="serial-header">
              <p>Serial #</p>
            </div>
            <div className="current-status-header">
              <p>Current Status</p>
            </div>
            <div className="date-made-header">
              <p>Date Made</p>
            </div>
            <div className="registration-header">
              <p>Registration</p>
            </div>
            <div className="latest-operator-header">
              <p>Latest Operator</p>
            </div>
            <div className="country-header">
              <p>Country</p>
            </div>
          </section>
          {this.props.store.filteredAirplanes.slice().map( plane => (
                <AirplaneExcerpt key={plane.id} {...plane} />
              ))
            }
        </div>
      </section>
    );
  }

  _airplaneCount = () => {
    if (this.props.store.filteredAirplanes.slice().length > 0) {
      return <p>Viewing {this.props.store.filteredAirplanes.slice().length} Records</p>;
    } else {
      return <p>There are {this.props.store.filteredAirplanes.slice().length} results for your search.</p>;
    }
  }
}
