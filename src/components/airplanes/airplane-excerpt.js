import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer
export default class AirplaneExcerpt extends React.Component {

  render() {
    return (
      <div className={parseInt(this.props.id, 10) & 1 ? 'airplane-excerpt excerpt-odd' : 'airplane-excerpt excerpt-even'}>
        <Link to={`/airplanes/${this.props.serial}`}>
          <div className="airplane-serial">
            <p>{this.props.serial}</p>
          </div>
          <div className="airplane-current-status">
            <p>{this.props.currentStatus}</p>
          </div>
          <div className="airplane-date-made">
            <p>{this.props.factoryDate}</p>
          </div>
          <div className="airplane-registration">
            <p>{this.props.latestReg}</p>
          </div>
          <div className="airplane-latest-operator">
            <p>{this.displayOperator()}</p>
          </div>
          <div className="airplane-country">
            <p>{this.displayCountries()}</p>
            <img src={this.displayFlag()} alt=""/>
          </div>
        </Link>
      </div>
    );
  }

  displayCountries() {
    if (this.props.latestCountry.charAt(0) === `(`) {
      var noCountry = this.props.latestCountry.slice(1, -1);
      return noCountry;
    } else {
      return this.props.latestCountry
    }
  }

  displayFlag() {
    let countryName = '';
    let countryUnder = '';
    let countryAll = '';
    if (this.props.latestCountry.charAt(0) === `(`) {
      countryName = this.props.latestCountry.slice(1, -1);
    } else {
      countryName = this.props.latestCountry;
    }
    countryUnder = countryName.split(' ').join('_');

    countryAll = `${process.env.PUBLIC_URL}/flags/${countryUnder}.png`;
    if (countryUnder === '?') {
      return null;
    } else {
      return countryAll;
    }
  }

  displayOperator() {
    if (this.props.latestOperator.charAt(0) === `(`) {
      var noOperate = this.props.latestOperator.slice(1, -1);
      return noOperate;
    } else {
      return this.props.latestOperator;
    }
  }
}
