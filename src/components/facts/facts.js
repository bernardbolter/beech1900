import React from 'react';
import { inject, observer } from 'mobx-react';

import Header from '../header/header';
import FactExcerpt from './factExcerpt';

import './facts.sass';

@inject('store')
@observer
export default class Facts extends React.Component {
  render() {
    return (
      <section>
        <Header match={this.props.match} />
        <div className="facts-line" />
        <div
          className={this.props.store.toggleMenu ? 'facts facts-open' : 'facts'}
        >
          <h1>Facts about the Beech 1900</h1>
          <div className="facts_info">
            <p>
              The Beechcraft 1900 is a 19-passenger, pressurized twin-engine
              turboprop fixed-wing aircraft that was manufactured by Beechcraft.
              It was designed, and is primarily used, as a regional airliner. It
              is also used as a freight aircraft and corporate transport, and by
              several governmental and military organisations. With customers
              favoring larger regional jets, Raytheon ended production in
              October 2002.
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/factory1.jpg`}
              alt="View of the Beach 1900 factory"
            />
          </div>
          <div className="facts_info info_reverse">
            <p>
              The aircraft was designed to carry passengers in all weather
              conditions from airports with relatively short runways. It is
              capable of flying in excess of 600 miles (970 km), although few
              operators use its full-fuel range. In terms of the number of
              aircraft built and its continued use by many passenger airlines
              and other users, it is one of the most popular 19-passenger
              airliners in history.
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/factory2.jpg`}
              alt="View of the Beaach 1900 factory"
            />
          </div>
          <div className="facts_excerpt_wrapper">
            <h2>
              List and info of all known operators who no longer fly the Beech
              1900.
            </h2>
            {this.props.store.factsData
              .slice()
              .map(fact => <FactExcerpt key={fact.id} {...fact} />)}
          </div>
        </div>
      </section>
    );
  }
}
