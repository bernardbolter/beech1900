import React from 'react';
import { observer, inject } from 'mobx-react';

import './newsletter.sass';

@inject('store', 'routing')
@observer
export default class Newsletter extends React.Component {
  render() {
    return (
      <div className="newsletter">
        <a onClick={this._closeNewsletter}>
          close <span className="news_x">x</span>
        </a>
        <p>Sign up for our Newsletter</p>
        <input />
        <div className="signup">
          <p>Sign Up</p>
        </div>
      </div>
    );
  }

  _closeNewsletter = () => {
    this.props.store.openNewsletter = false;
  };
}
