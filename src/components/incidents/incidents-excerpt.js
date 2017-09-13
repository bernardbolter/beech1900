import React from 'react';
import { observer } from 'mobx-react';

import './incidents-excerpt.sass';

@observer
export default class IncidentExcerpt extends React.Component {

  render() {
    return (
      <div className={parseInt(this.props.id, 10) & 1 ? 'incident-excerpt incident-odd' : 'incident-excerpt incident-even'}>
        <p className="incident-serial">{this.props.date}</p>
        <p className="incident-serial">{this.props.serial}</p>
        <p className="incident-registration">{this.props.registration}</p>
        <p className="incident-operator">{this.props.operator}</p>
        <p className="incident-location">{this.props.location}</p>
        <p className="incident-airport">{this.props.airport}</p>
        <p className="incident-fatalities">{this.props.fatalities}</p>
        <p className="incident-type">{this.props.type}</p>
        <p className="incident-editorial-synopsis">{this.props.editorialSynopsis}</p>
        <p className="incident-report-number">{this.props.reportNumber}</p>
        <p className="incident-additional-information">{this.props.additionalInformation}</p>
      </div>
    );
  }
}
