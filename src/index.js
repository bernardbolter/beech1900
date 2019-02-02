import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

import { storeData } from './store';

import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { Router, Route } from 'react-router-dom';
import { RouterStore } from 'mobx-react-router';

import Home from './components/home/home';
import Airplanes from './components/airplanes/airplanes';
import AirplaneSingle from './components/airplanes/airplane-single';
import Incidents from './components/incidents/incidents';
import Facts from './components/facts/facts';
import Forum from './components/forum/forum';

import registerServiceWorker from './registerServiceWorker';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  store: storeData
};

const Root = () => {
  return (
    <Provider {...stores}>
      <Router history={browserHistory}>
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/airplanes" component={Airplanes} />
          <Route path="/airplanes/:serial" component={AirplaneSingle} />
          <Route path="/incidents" component={Incidents} />
          <Route path="/facts" component={Facts} />
          <Route path="/forum" component={Forum} />
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
