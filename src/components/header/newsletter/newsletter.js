import React, { Component} from 'react';
import { observer, inject} from 'mobx-react';

import './newsletter.sass';

@inject('store', 'routing') @observer
export default class Newsletter extends React.Component {
  render() {
    return (
      <div className="newsletter">
        <a onClick={this._closeNewsletter}>x</a>
        <p>Sign up for our Newsletter</p>
        <input />
        <div className="signup">
          <p>Sign Up</p>
        </div>
      </div>
    );
  }

  _closeNewsletter = () => {
    console.log(this.props.store.openNewsletter);
    this.props.store.openNewsletter = false;
  }
}
