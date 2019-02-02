import React from 'react';

import './factExcerpt.sass';

export default class FactExcerpt extends React.Component {
  render() {
    return (
      <div className="fact_excerpt">
        <h3>{this.props.name}</h3>
        <h4>
          <p>First Delivery</p>
          {this.props.firstDelivery}
        </h4>
        <h4>
          <p>Last Operation</p>
          {this.props.lastOperation}
        </h4>
        <h4>
          <p>Total Deliveries</p>
          {this.props.totalDeliveries}
        </h4>
        <h4>
          <p>Size and Date at Largest</p>
          {this.props.size}
        </h4>
        <h4>
          <p>Dates according to Wikipedia</p>
          {this.props.wikiDates}
        </h4>
        <h4>
          <p>Size according to Wikipedia</p>
          {this.props.wikiSize}
        </h4>
      </div>
    );
  }
}
