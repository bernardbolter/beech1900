import React from 'react';

import './about.sass';
import Header from '../header/header';

export default class About extends React.Component {

  render() {
    return (
      <section>
      <Header match={this.props.match} />
        <div>About</div>
      </section>
    );
  }
}
