import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject} from 'mobx-react';

import './nav.sass';

import Newsletter from '../newsletter/newsletter';

@inject('store', 'routing') @observer
export default class Nav extends React.Component {

  render() {
    return (
      <div className={this.props.store.toggleMenu ? 'nav nav-open' : 'nav'}>
        <a className="nav_close_menu" onClick={this._closeMenu}>x</a>
        <Link to="/airplanes">airplanes</Link>
        <Link to="/incidents">incidents</Link>
        <Link to="/facts">facts</Link>
        <Link to="/about">about</Link>
        <a onClick={this._newsletterClick}>newsletter</a>
        {this.props.store.openNewsletter ? <Newsletter /> : null}
      </div>
    );
  }

  _newsletterClick = () => {
    this.props.store.openNewsletter = !this.props.store.openNewsletter;
    console.log(this.props.store.openNewsletter);
  }

  _closeMenu = () => {
    this.props.store.toggleMenu = false;
  }
}
