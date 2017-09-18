import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject} from 'mobx-react';

import './nav.sass';

import Newsletter from '../newsletter/newsletter';

@inject('store', 'routing') @observer
export default class Nav extends React.Component {

  render() {
    console.log(this.props.match.path);
    return (
      <div className={this._navClass()}>
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

  _navClass = () => {
    if (this.props.match.path === '/facts' && this.props.store.toggleMenu === true) {
      return 'nav nav-open nav-facts';
    } else if (this.props.store.toggleMenu === true) {
      return 'nav nav-open';
    } else {
      return 'nav';
    }
  }

  _newsletterClick = () => {
    this.props.store.openNewsletter = !this.props.store.openNewsletter;
    console.log(this.props.store.openNewsletter);
  }

  _closeMenu = () => {
    this.props.store.toggleMenu = false;
  }
}
