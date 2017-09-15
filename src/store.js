import { action, observable, computed } from 'mobx';

import airplanes from './data/airplanes.json';
import incidents from './data/incidents.json';

class Store {
  // Navigation Variables
  @observable location = '';
  @observable openNewsletter = false;
  @observable toggleMenu = false;
  @observable toggleSearch = false;
  @observable searchButton = false;

  // Ariplane Data Variables
  @observable airplaneData = airplanes;
  @observable airplaneCount = [];
  @observable isLoading = false;
  @observable airplaneFilter = '';

  @observable newerChecked = false;
  @observable olderChecked = true;

  @observable uaChecked = false;
  @observable ubChecked = false;
  @observable ucChecked = false;
  @observable ueChecked = false;

  @observable operatingChecked = false;
  @observable operatingNonCurrentChecked = false;
  @observable nonFlyingChecked = false;
  @observable partedOutChecked = false;
  @observable destroyedChecked = false;

  @observable countryValue = '';
  @observable operatorValue = '';

  // Incident Data Variables

  @observable incidentsData = incidents;
  @observable incidentsFilter = '';

  @observable incidentsTypeValue = '';
  @observable incidentsNewerChecked = false;
  @observable incidentsOlderChecked = true;
  @observable incidentsFatalitiesChecked = false;

  @computed get filteredAirplanes() {
    const matchesFilter = new RegExp(this.airplaneFilter, 'i');
    let airplaneFiltered = this.airplaneData.filter(airplane => !this.airplaneFilter || matchesFilter.test(airplane.serial) || matchesFilter.test(airplane.latestReg));
    let airplaneSorted = [];
    let airplaneType = [];
    let airplaneStatus = [];
    let airplaneDoubles = [];
    let airplaneDrop = [];
    let airplaneResults = [];

    let airplaneUA = [];
    let airplaneUB = [];
    let airplaneUC = [];
    let airplaneUE = [];

    let airplaneOperating = [];
    let airplaneOperatingNonCurrent = [];
    let airplaneNonFlying = [];
    let airplanePartedOut = [];
    let airplaneDestroyed = [];

    let airplaneCountry = [];
    let airplaneOperator = [];

    // FILTER LIST BY CURRENT STATUS

    if (this.operatingChecked === true ) {
      airplaneOperating = airplaneFiltered.filter(plane => plane.currentStatus.match(/^Operating$/));
    }

    if (this.operatingNonCurrentChecked === true ) {
      airplaneOperatingNonCurrent = airplaneFiltered.filter(plane => plane.currentStatus.match(/Non-Current/));
    }

    if (this.nonFlyingChecked === true ) {
      airplaneNonFlying = airplaneFiltered.filter(plane => plane.currentStatus.match(/^Non-Flying/));
    }

    if (this.partedOutChecked === true ) {
      airplanePartedOut = airplaneFiltered.filter(plane => plane.currentStatus.match(/^Parted/));
    }

    if (this.destroyedChecked === true ) {
      airplaneDestroyed = airplaneFiltered.filter(plane => plane.currentStatus.match(/^Destroyed/));
    }

    airplaneStatus = airplaneOperating.concat(airplaneOperatingNonCurrent, airplaneNonFlying, airplanePartedOut, airplaneDestroyed);

    if (airplaneStatus.length === 0) {
      airplaneStatus = airplaneFiltered;
    }

    airplaneStatus.sort( function(a, b) {
      return a.id - b.id;
    });


    // FILTER LIST BY DROPDOWN VALUES

    if (this.countryValue) {
      const theCountry = new RegExp(this.countryValue);
      airplaneCountry = airplaneStatus.filter(plane => plane.latestCountry.match(theCountry));
    }

    if (this.operatorValue) {
      const theOperator = new RegExp(this.operatorValue);
      airplaneOperator = airplaneStatus.filter(plane => plane.latestOperator.match(theOperator));
    }

    airplaneDoubles = airplaneCountry.concat(airplaneCountry, airplaneOperator);

    airplaneDrop = airplaneDoubles.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) === index;
    });

    if (airplaneDrop.length === 0) {
      airplaneDrop = airplaneStatus;
    }

    airplaneDrop.sort( function(a, b) {
      return a.id - b.id;
    });

    // FILTER LIST BY AIRPLANE TYPE

    if (this.uaChecked === true) {
      airplaneUA = airplaneDrop.filter(plane => plane.serial.match(/^UA/));
    }
    if (this.ubChecked === true) {
      airplaneUB = airplaneDrop.filter(plane => plane.serial.match(/^UB/));
    }
    if (this.ucChecked === true) {
      airplaneUC = airplaneDrop.filter(plane => plane.serial.match(/^UC/));
    }
    if (this.ueChecked === true) {
      airplaneUE = airplaneDrop.filter(plane => plane.serial.match(/^UE/));
    }

    airplaneType = airplaneUA.concat(airplaneUB, airplaneUC, airplaneUE);

    if (airplaneType.length === 0) {
      airplaneType = airplaneDrop;
    }

    // SORT LIST BEFORE RETURNING

    if (this.newerChecked === true) {
      airplaneSorted = airplaneType.reverse();
    } else {
      airplaneSorted = airplaneType;
    }

    airplaneResults = airplaneSorted;

    this.airplaneCount = airplaneResults;

    return airplaneResults;
  }


  @action getSingleAirplaneData(serial) {
    const singlularDataObject = this.airplaneData.filter(x => x.serial === serial);
    const singularDataArray = [];
    for (var key in singlularDataObject[0]) {
        if (singlularDataObject[0].hasOwnProperty(key)) {
            singularDataArray[key] = singlularDataObject[0][key];
        }
    }
    return singularDataArray;
  }

  @computed get filteredIncidents() {
    const matchesIncidentsFilter = new RegExp(this.incidentsFilter, 'i');
    let incidentsFiltered = this.incidentsData.filter(incident => !this.incidentsFilter || matchesIncidentsFilter.test(incident.registration) || matchesIncidentsFilter.test(incident.airport));
    let incidentsSorted = [];
    let incidentsType = [];
    let incidentsFatal = [];
    let incidentsResults = [];

    if (this.incidentsFatalitiesChecked) {
      incidentsFiltered.map( incident => {
        if (incident.fatalities > 0) {
          incidentsFatal.push(incident);
          return null;
        } else {
          return null;
        }
      });
    } else {
      incidentsFatal = incidentsFiltered;
    }

    if (this.incidentsTypeValue) {
      const theIncident = new RegExp(this.incidentsTypeValue);
      incidentsType = incidentsFatal.filter(incident => incident.type.match(theIncident));
    } else {
      incidentsType = incidentsFatal;
    }


    if (this.incidentsNewerChecked === true) {
      incidentsSorted = incidentsType.reverse();
    } else {
      incidentsSorted = incidentsType;
    }

    incidentsResults = incidentsSorted;

    return incidentsResults;
  }
}

export var storeData = new Store();
