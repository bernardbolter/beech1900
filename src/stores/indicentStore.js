import { action, observable, computed } from 'mobx';

import incidents from './data/incidents.json';

class incidentStore {
  // Incident Data Variables

  @observable incidentsData = incidents;
  @observable incidentsFilter = '';

  @observable incidentsTypeValue = '';
  @observable incidentsNewerChecked = false;
  @observable incidentsOlderChecked = true;
  @observable incidentsFatalitiesChecked = false;
}

export var incidentData = new incidentStore();
