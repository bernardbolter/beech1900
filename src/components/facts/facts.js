import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Header from '../header/header';

@inject('routing') @observer
export default class Facts extends React.Component {
  constructor(props) {
    super(props);
  }

render() {
  const { location, push, goBack } = this.props.routing;
    return (
      <section>
      <Header match={this.props.match} />
        <div>
        <button onClick={() => push('/about')}>Change url</button>
        <button onClick={() => goBack()}>Go Back</button>
        <p>Facts</p>
        </div>
      </section>
    );
  }
}
