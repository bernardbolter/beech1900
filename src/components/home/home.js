import React from 'react';
import { observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';

import './home.sass';
import Header from '../header/header';

@inject('store', 'routing') @observer
export default class About extends React.Component {

  render() {
    console.log(this.props.store);
    return (
      <section>
      <Header match={this.props.match} />
      <section className={this.props.store.toggleMenu ? "home home-open" : "home"}>
          <div className="home-text">
            <h1>Welcome to Beech1900.com! This website is an active database of information about this turboprop airline which was produced between 1984 and 2002. You'll find it a comprehensive and reliable provider of information, meant to be shared with my fellow aviation enthusiasts.</h1>
            <h1>In 2006, former Captain and aviation enthusiast Aaron Kahn came up with this idea and started keeping track of the movements and statuses of all the Beech 1900s. Aaron’s hope is that you’ll enjoy this website and share it with your friends.</h1>
            <p>below are the top rankings of the stats</p>
          </div>
          <div className="home-grid">
            {this._makeGridRow("currentStatus")}
            {this._makeGridRow("airplaneProduction")}
            {this._makeGridRow("latestOperator")}
            {this._makeGridRow("latestCountry")}
            {this._makeGridRow("serial")}
            {this._makeGridRow("accidentType")}
          </div>
          <div className="home-footer">
            <p>Beech1900.com | all rights reserved - {new Date().getFullYear()}</p>
          </div>
        </section>
      </section>
    );
  }

  _makeGridRow = (key) => {
    var theData = this.props.store.calculateGridData(key);
    return (
    <div className={"grid-" + key}>
    {this._decideGridHeader(key)}

    {theData.slice(0, 10).map((data, i) => {
        if (data.name === null) {
          return (
            <div className={ i % 2 ? `grid-cell grid-cell-even grid-cell-${key}`: `grid-cell grid-cell-odd grid-cell-${key}`} key={i}></div>
          )
        } else {
          return (
            <Link to={key === "accidentType" ? "/incidents" : "/airplanes"} onClick={() => {this._decideLinks(data, key)}} key={i} className={ i % 2 ? `grid-cell grid-cell-even grid-cell-${key}`: `grid-cell grid-cell-odd grid-cell-${key}`}>
              <p className="grid-name">{data.name}</p>
              <p className="grid-count">{data.count}</p>
            </Link>
            )
          }
        })
      }
      </div>
    )
  }

  _decideGridHeader = (key) => {
    let headerText = '';
    if (key === "serial") {
      headerText = "Serial Series";
    } else if (key === "currentStatus") {
      headerText = "Current Status";
    } else if (key === "latestCountry") {
      headerText = "Top Countries";
    } else if (key === "airplaneProduction") {
      headerText = "Prod. Runs";
    } else if (key === "latestOperator") {
      headerText = "Top Operators";
    } else if (key === "accidentType") {
      headerText = "Top Incidents Type";
    }
    return (
      <div className={"grid-cell-header grid-cell-header-" + key}>
        <p>{headerText}</p>
      </div>
    )
  }

  _decideLinks = (data, key) => {
    if (key === "serial") {
      if (data.name === "UA") {
        this.props.store.resetSearch();
        this.props.store.uaChecked = true;
      } else if (data.name === "UB") {
        this.props.store.resetSearch();
        this.props.store.ubChecked = true;
      } else if (data.name === "UC") {
        this.props.store.resetSearch();
        this.props.store.ucChecked = true;
      } else if (data.name === "UD") {
        this.props.store.resetSearch();
        this.props.store.udChecked = true;
      } else if (data.name === "UE") {
        this.props.store.resetSearch();
        this.props.store.ueChecked = true;
      } else {
        this.props.store.resetSearch();
      }
    } else if (key === "currentStatus") {
      if (data.name === "Operating") {
        this.props.store.resetSearch();
        this.props.store.operatingChecked = true;
      } else if (data.name === "Operating (Non-Current)") {
        this.props.store.resetSearch();
        this.props.store.operatingNonCurrentChecked = true;
      } else if (data.name === "Non-Flying") {
        this.props.store.resetSearch();
        this.props.store.nonFlyingChecked = true;
      } else if (data.name === "Parted-Out") {
        this.props.store.resetSearch();
        this.props.store.partedOutChecked = true;
      } else if (data.name === "Destroyed") {
        this.props.store.resetSearch();
        this.props.store.destroyedChecked = true;
      } else {
        this.props.store.resetSearch();
      }
    } else if (key === "latestCountry") {
      this.props.store.resetSearch();
      this.props.store.countryValue = data.name;
    } else if (key === "latestOperator") {
      this.props.store.resetSearch();
      this.props.store.operatorValue = data.name;
    } else if (key === "accidentType") {
      this.props.store.incidentsSearchReset()
      this.props.store.incidentsTypeValue = data.name
    }
  }
}
