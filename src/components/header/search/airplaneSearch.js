import React from 'react';
import { observer, inject} from 'mobx-react';

import './airplaneSearch.sass';

@inject('store', 'routing') @observer
export default class AirplaneSearch extends React.Component {
  constructor() {
    super()

    this.state = {
      countryCounts: [],
      operatorCounts: []
    }
  }

  componentWillMount() {
    this.setState({
      countryCounts: this.getCountryDropdown(),
      operatorCounts: this.getOperatorDropdown()
    });
  }

  render() {
    return (
      <div className="search">

        <div className="search-column-one">
          <p>sort by</p>
          <label htmlFor="older" className="sort-label check-older">
            <span>older </span>
            <input type="checkbox" id="older" value="older" checked={this.props.store.olderChecked} onChange={this.toggleSorting} />
          </label>
          <label htmlFor="newer" className="sort-label check-newer">
            <span>newer </span>
            <input type="checkbox" id="newer" value="newer" checked={this.props.store.newerChecked} onChange={this.toggleSorting} />
          </label>
          <input className="search-input filter" placeholder="search serial and reg..." type="text" value={this.props.store.airplaneFilter} onChange={this.goFilter} />
        </div>

        <div className="search-column-two">
          <p>filter by</p>
          <label htmlFor="ua" className="filter-label check-ua">
            <input type="checkbox" id="ua" value="ua" checked={this.props.store.uaChecked} onChange={this.toggleFilters} />
            <span> UA</span>
          </label>
          <label htmlFor="ub" className="filter-label check-ub">
            <input type="checkbox" id="ub" value="ub" checked={this.props.store.ubChecked} onChange={this.toggleFilters} />
            <span> UB</span>
          </label>
          <label htmlFor="uc" className="filter-label check-uc">
            <input type="checkbox" id="uc" value="uc" checked={this.props.store.ucChecked} onChange={this.toggleFilters} />
            <span> UC</span>
          </label>
          <label htmlFor="ue" className="filter-label check-ue">
            <input type="checkbox" id="ue" value="ue" checked={this.props.store.ueChecked} onChange={this.toggleFilters} />
            <span> UE</span>
          </label>
        </div>

        <div className="search-column-three">
          <label htmlFor="operating" className="filter-label check-operating">
            <input type="checkbox" id="operating" value="operating" checked={this.props.store.operatingChecked} onChange={this.toggleFilters} />
            <span> Operating</span>
          </label>
          <label htmlFor="operatingNonCurrent" className="filter-label check-operatingNonCurrent">
            <input type="checkbox" id="operatingNonCurrent" value="operatingNonCurrent" checked={this.props.store.operatingNonCurrentChecked} onChange={this.toggleFilters} />
            <span> Operating (Non-Current)</span>
          </label>
          <label htmlFor="nonFlying" className="filter-label check-nonFlying">
            <input type="checkbox" id="nonFlying" value="nonFlying" checked={this.props.store.nonFlyingChecked} onChange={this.toggleFilters} />
            <span> Non-Flying</span>
          </label>
          <label htmlFor="partedOut" className="filter-label check-partedOut">
            <input type="checkbox" id="partedOut" value="partedOut" checked={this.props.store.partedOutChecked} onChange={this.toggleFilters} />
            <span> Parted-Out</span>
          </label>
          <label htmlFor="destroyed" className="filter-label check-destroyed">
            <input type="checkbox" id="destroyed" value="destroyed" checked={this.props.store.destroyedChecked} onChange={this.toggleFilters} />
            <span> Destroyed</span>
          </label>
        </div>

        <div className="search-column-four">
          <div className="search-reset" onClick={this.searchReset}>
            <svg id="reset-svg" width="18px" height="20px" viewBox="0 0 18 20" version="1.1">
                <g>
                    <path d="M16.2378148,11.0185282 L16.2378148,11.0277564 C16.2378148,15.0773034 12.9756496,18.3717673 8.92637405,18.3717673 C4.87682708,18.3717673 1.6122191,15.0773034 1.6122191,11.0277564 C1.6122191,7.0039941 4.83828581,3.72744376 8.90954617,3.68645974 L8.90954617,5.02780432 C8.90954617,5.79862962 9.59894626,5.81844308 9.98083048,5.47482871 L12.7910858,3.38111521 C12.7910858,3.38111521 13.0972446,3.12544006 13.0972446,2.84398026 C13.0972446,2.54840676 12.7859289,2.30684531 12.7859289,2.30684531 L9.98164473,0.21313182 C9.59976051,-0.130482555 8.90954617,-0.11039767 8.90954617,0.660156207 L8.90954617,2.05768418 C4.02403374,2.0986682 0,6.10587406 0,11.027485 C0,15.975152 3.98603531,20 8.9334309,20 C13.8802837,20.0002714 17.866319,15.9754234 17.866319,11.0277564 L17.866319,11.0185282 C17.866319,11.0185282 17.866319,10.1024946 17.0420244,10.1024946 C16.2673993,10.1022232 16.2378148,11.0185282 16.2378148,11.0185282 Z"></path>
                </g>
            </svg>
            <p>reset</p>
          </div>
          <select value={this.props.store.operatorValue} onChange={this.handleOperatorChange}>
            <option defaultValue="selected">Select Latest Operator</option>
              {this.state.operatorCounts.map(oper => (
                  <option key={oper} value={oper}>{oper}</option>
              ))
            }
          </select>
          <select value={this.props.store.countryValue} onChange={this.handleCountryChange}>
            <option>Select Country</option>
            { this.state.countryCounts.map(country => (
                <option key={country} value={country}>{country}</option>
              ))
            }
          </select>
        </div>

      </div>
    );
  }

  goFilter = (e) => {
  this.props.store.airplaneFilter = e.target.value;
  }

  toggleSorting = (e) => {
    switch (e.target.value) {
    case 'newer':
      this.props.store.newerChecked = true;
      this.props.store.olderChecked = false;
      break;
    case 'older':
      this.props.store.newerChecked = false;
      this.props.store.olderChecked = true;
      break;
    default:
      this.props.store.newerChecked = true;
      this.props.store.olderChecked = false;
      break;
    }
  }

  toggleFilters = (e) => {
    switch (e.target.value) {
      case 'ua':
        this.props.store.uaChecked = !this.props.store.uaChecked;
      break;
      case 'ub':
        this.props.store.ubChecked = !this.props.store.ubChecked;
      break;
      case 'uc':
        this.props.store.ucChecked = !this.props.store.ucChecked;
      break;
      case 'ue':
        this.props.store.ueChecked = !this.props.store.ueChecked;
      break;
      case 'operating':
        this.props.store.operatingChecked = !this.props.store.operatingChecked;
      break;
      case 'operatingNonCurrent':
        this.props.store.operatingNonCurrentChecked = !this.props.store.operatingNonCurrentChecked;
      break;
      case 'nonFlying':
        this.props.store.nonFlyingChecked = !this.props.store.nonFlyingChecked;
      break;
      case 'partedOut':
        this.props.store.partedOutChecked = !this.props.store.partedOutChecked;
      break;
      case 'destroyed':
        this.props.store.destroyedChecked = !this.props.store.destroyedChecked;
      break
      default:

    }
  }

  getCountryDropdown = () => {
    const countryList = [];
    this.props.store.airplaneData.map( air => {
      if (air.latestCountry.charAt(0) === `(`) {
        var noCountry = air.latestCountry.slice(1, -1);
        countryList.push(noCountry);
        return null;
      } else if (air.latestCountry === '?') {
        return null;
      } else {
        countryList.push(air.latestCountry);
        return null;
      }
    });
    const uniqCountries = countryList.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) === index;
    });
    uniqCountries.sort();

    return uniqCountries;
  }

  getOperatorDropdown = () => {
    const operatorList = [];
    this.props.store.airplaneData.map( ops => {
      if (ops.latestOperator.charAt(0) === `(`) {
        var noOperator = ops.latestOperator.slice(1, -1);
        operatorList.push(noOperator);
        return null;
      } else if (ops.latestOperator === "" || "?") {
        return null;
      } else {
        operatorList.push(ops.latestOperator);
        return null;
      }
    });
    const uniqOperators = operatorList.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) === index;
    });
    uniqOperators.sort();

    return uniqOperators;
  }

  handleCountryChange = (e) => {
    this.props.store.countryValue = e.target.value;
  }

  handleOperatorChange = (e) => {
    this.props.store.operatorValue = e.target.value;
  }

  searchReset = () => {
    this.props.store.airplaneFilter = '';
    this.props.store.countryValue = '';
    this.props.store.operatorValue = '';
    this.props.store.uaChecked = false;
    this.props.store.ubChecked = false;
    this.props.store.ucChecked = false;
    this.props.store.ueChecked = false;
    this.props.store.operatingChecked = false;
    this.props.store.operatingNonCurrentChecked = false;
    this.props.store.nonFlyingChecked = false;
    this.props.store.partedOutChecked = false;
    this.props.store.destroyedChecked = false;
    this.props.store.newerChecked = false;
    this.props.store.olderChecked = true;
  }
}
