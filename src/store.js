import { action, observable, computed } from 'mobx';

import airplanes from './data/airplanes.json';
import incidents from './data/incidents.json';
import facts from './data/facts.json';

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
  @observable udChecked = false;
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

  // Facts Data
  @observable factsData = facts;

  @computed
  get filteredAirplanes() {
    const matchesFilter = new RegExp(this.airplaneFilter, 'i');
    let airplaneFiltered = this.airplaneData.filter(
      airplane =>
        !this.airplaneFilter ||
        matchesFilter.test(airplane.serial) ||
        matchesFilter.test(airplane.latestReg)
    );
    let airplaneSorted = [];
    let airplaneType = [];
    let airplaneStatus = [];
    let airplaneDrop = [];
    let airplaneResults = [];

    let airplaneUA = [];
    let airplaneUB = [];
    let airplaneUC = [];
    let airplaneUD = [];
    let airplaneUE = [];

    let airplaneOperating = [];
    let airplaneOperatingNonCurrent = [];
    let airplaneNonFlying = [];
    let airplanePartedOut = [];
    let airplaneDestroyed = [];

    let airplaneCountry = [];
    let airplaneOperator = [];

    // FILTER LIST BY AIRPLANE TYPE

    if (this.uaChecked === true) {
      airplaneUA = airplaneFiltered.filter(plane => plane.serial.match(/^UA/));
    }
    if (this.ubChecked === true) {
      airplaneUB = airplaneFiltered.filter(plane => plane.serial.match(/^UB/));
    }
    if (this.ucChecked === true) {
      airplaneUC = airplaneFiltered.filter(plane => plane.serial.match(/^UC/));
    }
    if (this.udChecked === true) {
      airplaneUD = airplaneFiltered.filter(plane => plane.serial.match(/^UD/));
    }
    if (this.ueChecked === true) {
      airplaneUE = airplaneFiltered.filter(plane => plane.serial.match(/^UE/));
    }

    airplaneType = airplaneUA.concat(
      airplaneUB,
      airplaneUC,
      airplaneUD,
      airplaneUE
    );

    if (
      this.uaChecked === false &&
      this.ubChecked === false &&
      this.ucChecked === false &&
      this.udChecked === false &&
      this.ueChecked === false
    ) {
      airplaneType = airplaneFiltered;
    }

    // FILTER LIST BY CURRENT STATUS

    if (this.operatingChecked === true) {
      airplaneOperating = airplaneType.filter(plane =>
        plane.currentStatus.match(/^Operating$/)
      );
    }

    if (this.operatingNonCurrentChecked === true) {
      airplaneOperatingNonCurrent = airplaneType.filter(plane =>
        plane.currentStatus.match(/Non-Current/)
      );
    }

    if (this.nonFlyingChecked === true) {
      airplaneNonFlying = airplaneType.filter(plane =>
        plane.currentStatus.match(/^Non-Flying/)
      );
    }

    if (this.partedOutChecked === true) {
      airplanePartedOut = airplaneType.filter(plane =>
        plane.currentStatus.match(/^Parted/)
      );
    }

    if (this.destroyedChecked === true) {
      airplaneDestroyed = airplaneType.filter(plane =>
        plane.currentStatus.match(/^Destroyed/)
      );
    }

    airplaneStatus = airplaneOperating.concat(
      airplaneOperatingNonCurrent,
      airplaneNonFlying,
      airplanePartedOut,
      airplaneDestroyed
    );

    if (
      this.operatingChecked === false &&
      this.operatingNonCurrentChecked === false &&
      this.nonFlyingChecked === false &&
      this.partedOutChecked === false &&
      this.destroyedChecked === false
    ) {
      airplaneStatus = airplaneType;
    }

    airplaneStatus.sort(function(a, b) {
      return a.id - b.id;
    });

    // FILTER LIST BY COUNTRY and OPERATOR VALUES

    if (this.countryValue === null || this.countryValue === 'Select Country') {
      airplaneCountry = airplaneStatus;
    } else {
      const theCountry = new RegExp(this.countryValue);
      airplaneCountry = airplaneStatus.filter(plane =>
        plane.latestCountry.match(theCountry)
      );
    }

    if (
      this.operatorValue === null ||
      this.operatorValue === 'Select Latest Operator'
    ) {
      airplaneOperator = airplaneCountry;
    } else {
      const theOperator = new RegExp(this.operatorValue);
      airplaneOperator = airplaneCountry.filter(plane =>
        plane.latestOperator.match(theOperator)
      );
    }

    airplaneDrop = airplaneOperator;

    airplaneDrop.sort(function(a, b) {
      return a.id - b.id;
    });

    // SORT LIST BEFORE RETURNING

    if (this.newerChecked === true) {
      airplaneSorted = airplaneDrop.reverse();
    } else {
      airplaneSorted = airplaneDrop;
    }

    airplaneResults = airplaneSorted;

    this.airplaneCount = airplaneResults;

    return airplaneResults;
  }

  @action
  getSingleAirplaneData(serial) {
    const singlularDataObject = this.airplaneData.filter(
      x => x.serial === serial
    );
    const singularDataArray = [];
    for (var key in singlularDataObject[0]) {
      if (singlularDataObject[0].hasOwnProperty(key)) {
        singularDataArray[key] = singlularDataObject[0][key];
      }
    }
    return singularDataArray;
  }

  @computed
  get filteredIncidents() {
    const matchesIncidentsFilter = new RegExp(this.incidentsFilter, 'i');
    let incidentsFiltered = this.incidentsData.filter(
      incident =>
        !this.incidentsFilter ||
        matchesIncidentsFilter.test(incident.registration) ||
        matchesIncidentsFilter.test(incident.locationCity) ||
        matchesIncidentsFilter.test(incident.operator) ||
        matchesIncidentsFilter.test(incident.locationAirport)
    );
    let incidentsSorted = [];
    let incidentsType = [];
    let incidentsFatal = [];
    let incidentsResults = [];

    if (this.incidentsFatalitiesChecked) {
      incidentsFiltered.map(incident => {
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

    if (
      this.incidentsTypeValue === null ||
      this.incidentsTypeValue === 'Select Incident Type'
    ) {
      incidentsType = incidentsFatal;
    } else {
      const theIncident = new RegExp(this.incidentsTypeValue);
      incidentsType = incidentsFatal.filter(incident =>
        incident.accidentType.match(theIncident)
      );
    }

    if (this.incidentsNewerChecked === true) {
      incidentsSorted = incidentsType.reverse();
    } else {
      incidentsSorted = incidentsType;
    }

    incidentsResults = incidentsSorted;

    return incidentsResults;
  }

  @action
  calculateGridData(theKey) {
    let theKeys = [];
    let p = theKey;
    // Get all the valuse into one array
    if (theKey === 'accidentType') {
      this.incidentsData.slice().map(y => {
        return theKeys.push(y.accidentType);
      });
    } else {
      this.airplaneData.slice().map(x => {
        if (theKey === 'serial') {
          var shortValue = x.serial.substring(0, 2);
          return theKeys.push(shortValue);
        } else if (theKey === 'latestCountry') {
          if (x.latestCountry.charAt(0) === `(`) {
            var noCountry = x.latestCountry.slice(1, -1);
            return theKeys.push(noCountry);
          } else {
            return theKeys.push(x.latestCountry);
          }
        } else if (theKey === 'latestOperator') {
          if (x.latestOperator === '?') {
            return null;
          } else if (x.latestOperator.charAt(0) === `(`) {
            var noOp = x.latestOperator.slice(1, -1);
            return theKeys.push(noOp);
          } else {
            return theKeys.push(x.latestOperator);
          }
        } else if (theKey === 'airplaneProduction') {
          if (x.factoryDate === '?') {
            return null;
          } else {
            var theYear = x.factoryDate.slice(-2);
            if (theYear.charAt(0) === ('0' || '1')) {
              theYear = '20' + theYear;
            } else {
              theYear = '19' + theYear;
            }
            return theKeys.push(theYear);
          }
        } else {
          return theKeys.push(x[p]);
        }
      });
    }

    // Sort that array so it can be parsed and counted
    theKeys.sort();

    let theList = {};
    let finalList = [];

    theKeys.forEach(function(x) {
      theList[x] = (theList[x] || 0) + 1;
    });

    Object.keys(theList).forEach(key => {
      finalList.push({ name: key, count: theList[key] });
    });

    //Sort the objects so from largest count to lowest
    finalList.sort(function(a, b) {
      return b.count - a.count;
    });

    finalList = finalList.slice(0, 10);

    return finalList;
  }

  @action
  resetSearch = () => {
    this.airplaneFilter = '';
    this.countryValue = '';
    this.operatorValue = '';
    this.uaChecked = false;
    this.ubChecked = false;
    this.ucChecked = false;
    this.udChecked = false;
    this.ueChecked = false;
    this.operatingChecked = false;
    this.operatingNonCurrentChecked = false;
    this.nonFlyingChecked = false;
    this.partedOutChecked = false;
    this.destroyedChecked = false;
    this.newerChecked = false;
    this.olderChecked = true;
  };

  @action
  incidentsSearchReset = () => {
    this.incidentsFilter = '';
    this.incidentsTypeValue = '';
    this.incidentsNewerChecked = false;
    this.incidentsOlderChecked = true;
    this.incidentsFatalitiesChecked = false;
  };
}

export var storeData = new Store();
