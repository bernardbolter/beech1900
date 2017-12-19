import React from 'react';
import { observer, inject} from 'mobx-react';

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
          {this._makeGridRow("latestOwner")}
          {this._makeGridRow("latestCountry")}
        </div>
      </section>
    );
  }

  _makeGridRow = (key) => {
    var theData = this.props.store.calculateGridData(key);
    console.log(theData)
    return (
    <div className={"grid-" + key}>
    {theData.slice(0, 10).map((data, i) => (
        <div className={"grid-cell grid-cell-" + key} key={i}>
          <h5>{data.name}</h5>
          <h5>{data.count}</h5>
        </div>
      ))
    }
    </div>
  )};
}
