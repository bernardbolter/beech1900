import React from 'react';
import { observer, inject } from 'mobx-react';

import './logo.sass';

@inject('store') @observer
export default class Logo extends React.Component {

  render() {
    return (
      <div className="logo">
        <div className="logo_text_wrap">
          <p>BEECH</p>
          <p>1900</p>
        </div>
        <div className="mobile_buttons">
          <a onClick={this._openMenu} className="search-menu">menu</a>
          <a onClick={this._openSearch} className={this.props.store.searchButton ? 'search-button search-button-on' : 'search-button'}>
            <svg className={this.props.store.searchButton ? 'search-svg search-svg-on' : 'search-svg'} id="search-svg" height="30px" width="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <line id="search-svg-left-line" x1={11} y1={12} x2={19} y2={19} />
              <line id="search-svg-right-line" x1={19} y1={12} x2={11} y2={19} />
              <circle id="search-svg-circle" cx="15" cy="15" r="10" fill="transparent" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  _openMenu = () => {
    this.props.store.toggleMenu = !this.props.store.toggleMenu;
    this.props.store.toggleSearch = false;
    this.props.store.searchButton = false;
  }

  _openSearch = () => {
    this.props.store.toggleSearch = !this.props.store.toggleSearch;
    this.props.store.searchButton = !this.props.store.searchButton;
    this.props.store.toggleMenu = false;
  }
}
