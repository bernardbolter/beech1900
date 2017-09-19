import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import './incidents-excerpt.sass';

@observer
export default class IncidentExcerpt extends React.Component {

  render() {
    return (
        <div className={parseInt(this.props.id, 10) & 1 ? 'incident-excerpt incident-odd' : 'incident-excerpt incident-even'}>
          <div className="incident-left">
            <div className="incident-left-one">
              <p className="incident-date"><span className="incident-span">Date of Incident</span>{this.props.date}</p>
              {this._renderSerial()}
              <p className="incident-registration"><span className="incident-span">Registration</span>{this.props.registration}</p>
              <p className="incident-operator"><span className="incident-span">Operator</span>{this.props.operator}</p>
            </div>
            <div className="incident-left-two">
              <p className="incident-location"><span className="incident-span">Location</span>{this.props.location}</p>
              <p className="incident-airport"><span className="incident-span">Airport</span>{this.props.airport}</p>
              <p className="incident-fatalities"><span className="incident-span">Fatalities</span>{this.props.fatalities}</p>
            </div>
          </div>
          <div className="incident-right">
            <p className="incident-type"><span className="incident-span">Type of Incident</span>{this.props.type}</p>
            <p className="incident-editorial-synopsis"><span className="incident-span">Synopsis</span>{this.props.editorialSynopsis}</p>
            <p className="incident-report-number"><span className="incident-span">Report Number</span>{this.props.reportNumber}</p>
            <p className="incident-additional-information"><span className="incident-span">Aditional Information</span>{this.props.additionalInformation}</p>
          </div>
        </div>
    );
  }
  _renderSerial = () => {
    if (this.props.serial === '' || this.props.serial === '?') {
      return <p className="incident-serial"><span className="incident-span">Serial Number</span>{this.props.serial}</p>;
    } else {
      return <Link to={`/airplanes/${this.props.serial}`} className="incidents-link"><p className="incident-serial"><span className="incident-span">Serial Number</span>{this.props.serial}</p></Link>;
    }
  }
}
