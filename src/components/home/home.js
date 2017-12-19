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
        <h1>Welcome to Beech1900.com! This website is an active database of information about this turboprop airline which was produced between 1984 and 2002. You'll find it a comprehensive and reliable provider of information, meant to be shared with my fellow aviation enthusiasts.</h1>
        <h1>In 2006, former Captain and aviation enthusiast Aaron Kahn came up with this idea and started keeping track of the movements and statuses of all the Beech 1900s. Aaron’s hope is that you’ll enjoy this website and share it with your friends.</h1>
        <div className="home-grid">
          {this._makeGridRow("currentStatus")}
          {this._makeGridRow("latestOperator")}
          {this._makeGridRow("latestCountry")}
          {this._makeGridRow("accidentType")}
          {this._makeGridRow("serial")}
          {this._makeGridRow("airplaneProduction")}
        </div>
      </section>
    );
  }

  _makeGridRow = (key) => {
    var theData = this.props.store.calculateGridData(key);
    return (
    <div className={"grid-" + key}>
    {theData.slice(0, 10).map((data, i) => (
        <Link to={key === "accidentType" ? "/incidents" : "/airplanes"} onClick={() => {this._decideLinks(data, key)}} className={"grid-cell grid-cell-" + key} key={i}>
          <h5>{data.name}</h5>
          <h5>{data.count}</h5>
        </Link>
        ))
      }
      </div>
    )
  }

  _decideLinks = (data, key) => {
    console.log(data);
    console.log(key);
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
