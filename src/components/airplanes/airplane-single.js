import React from 'react';
import { observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';

import './airplane-single.sass';

import Header from '../header/header';
import IncidentExcerpt from '../incidents/incidents-excerpt';

@inject('store', 'routing') @observer
export default class AirplaneSingle extends React.Component {

  constructor() {
    super()
    this.state = {
      singleData: []
    }
  }

  componentWillMount() {
    const serial = this.props.match.params.serial;
    const passedData = this.props.store.getSingleAirplaneData(serial);
    this.setState({ singleData: passedData });
  }

  render() {
    return (
      <section>
      <Header match={this.props.match} />
        <div className="airplane-single">
          <Link to={`/`}>
            <div className="airplane-single-top">
              <svg width="10" height="20" viewBox="0 0 10 20">
                <line x1="0" x2="10" y1="10" y2="0" strokeWidth="1" stroke="#999999" />
                <line x1="0" x2="10" y1="10" y2="20" strokeWidth="1" stroke="#999999" />
              </svg>
              <p>Back</p>
            </div>
          </Link>
          <div className="airplane-single-colors">
            <div className="airplane-single-serial"><h3>Serial</h3><p>{this.state.singleData.serial}</p></div>
            <div className="airplane-single-current-status"><h3>Current Status</h3><p>{this.state.singleData.currentStatus}</p></div>
            <div className="airplane-single-date-made"><h3>Date Made</h3><p>{this.state.singleData.factoryDate}</p></div>
            <div className="airplane-single-registration"><h3>Registration</h3><p>{this.state.singleData.latestReg}</p></div>
            <div className="airplane-single-latest-operator"><h3>Latest Operator</h3><p>{this.displayOperator()}</p></div>
            <div className="airplane-single-country"><h3>Country</h3><p>{this.displayCountries()}</p></div>
          </div>
        </div>
        <section className="airplane-single-bottom-container">
          <div className="airplane-single-bottom-left">
            <p className="bot-info-title">Initial Operator</p>
            <p className="bot-info-data">{this.state.singleData.initialOperator}</p>
            <p className="bot-info-title">Initial Registration</p>
            <p className="bot-info-data">{this.state.singleData.initialopReg}</p>
            <p className="bot-info-title">Factory Date</p>
            <p className="bot-info-data">{this.state.singleData.factoryDate}</p>
            <p className="bot-info-title">Factory Registration</p>
            <p className="bot-info-data">{this.state.singleData.factoryReg}</p>
            <p className="bot-info-title">Factory Date</p>
            <p className="bot-info-data">{this.state.singleData.factoryDate}</p>
            <p className="bot-info-title">Latest Operator</p>
            <p className="bot-info-data">{this.state.singleData.latestOperator}</p>
            <p className="bot-info-title">Latest Owner</p>
            <p className="bot-info-data">{this.state.singleData.latestOwner}</p>
            <p className="bot-info-title">Latest Registration</p>
            <p className="bot-info-data">{this.state.singleData.latestReg}</p>
            <p className="bot-info-title">Latest Registration Date</p>
            <p className="bot-info-data">{this.state.singleData.latestregDate}</p>
            <p className="bot-info-title">Current Status</p>
            <p className="bot-info-data">{this.state.singleData.currentStatus}</p>
            <p className="bot-info-title">Current Status Date</p>
            <p className="bot-info-data">{this.state.singleData.currentstatusDate}</p>
            <p className="bot-info-title">Current Data Source</p>
            <p className="bot-info-data">{this.state.singleData.dataSource}</p>
          </div>
          <div className="airplane-single-bottom-right">
            <h1>Events</h1>

            {this.getEvents()}

            {this.getIncidents()}

          </div>
        </section>
      </section>
    );
  }
  getEvents = () => {
    const eventArray = []
    for (var i = 1; i < 15; i++) {
      const date = `this.state.singleData.event${i}Date`;
      if (eval(date) !== "") {
        const owner = `this.state.singleData.event${i}Owner`;
        const op = `this.state.singleData.event${i}Operator`;
        const comment = `this.state.singleData.event${i}Comment`;
        let evenOdd = ''
        if (i%2 === 0) {
          evenOdd = 'event-container even';
        } else {
          evenOdd = 'event-container odd';
        }
        eventArray.push(<div key={i} className={evenOdd}><p>Date</p><h3>{eval(date)}</h3><p>Owner</p><h3>{eval(owner)}</h3><p>Operator</p><h3>{eval(op)}</h3><p>Comment</p><h3>{eval(comment)}</h3></div>)
      }
    }
    return eventArray;
  }

  getIncidents = () =>{
    if (this.state.singleData.incidentHistory !== "") {
      const incidents = this.state.singleData.incidentHistory.toString();
      let incidentArray = incidents.split(";");

      let filteredIncidents = [];
      incidentArray.map(incident => {
        let anIncident = this.props.store.incidentsData.slice().filter(function(obj) {
          return obj.id === incident;
        });
        filteredIncidents.push(anIncident[0]);
        return null;
      });

      return (
        <div>
          <h1>Incidents</h1>
          {filteredIncidents.map(dents => {
            return <IncidentExcerpt key={dents.id} {...dents} />
            })
          }
        </div>
      );
    } else {
      return null;
    }
  }

  displayCountries = () => {
    if (this.state.singleData.latestCountry.charAt(0) === `(`) {
      var noCountry = this.state.singleData.latestCountry.slice(1, -1);
      return noCountry;
    } else {
      return this.state.singleData.latestCountry
    }
  }

  displayOperator = () => {
    if (this.state.singleData.latestOperator.charAt(0) === `(`) {
      var noOperate = this.state.singleData.latestOperator.slice(1, -1);
      return noOperate;
    } else {
      return this.state.singleData.latestOperator;
    }
  }
}
