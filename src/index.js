import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './variables.scss';

import { storeData } from './store';

import { createHistory } from 'history';

import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import Header from './components/header/header';

import Airplanes from './components/airplanes/airplanes';
import AirplaneSingle from './components/airplanes/airplane-single';
import Incidents from './components/incidents/incidents';
import Facts from './components/facts/facts';
import Forum from './components/forum/forum';
import About from './components/about/about';

import registerServiceWorker from './registerServiceWorker';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  store: storeData
}

const Root = () => {
  return (
    <Provider {...stores}>
      <Router history={browserHistory}>
        <div className="container">
          <Route exact path="/" component={Airplanes} />
          <Route exact path="/airplanes" component={Airplanes} />
          <Route path="/airplanes/:serial" component={AirplaneSingle} />
          <Route path="/incidents" component={Incidents} />
          <Route path="/facts" component={Facts} />
          <Route path="/forum" component={Forum} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
