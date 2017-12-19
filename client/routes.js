import React from 'react';
import { withRouter } from 'react-router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import Client from './components/Client';
import ModuleGraph from './components/ModuleGraph';
import MyChart from './components/MyChart';


class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-routes">
          <Switch>
            <Route exact name="home" path="/" component={Home} />
            <Route exact name="client" path="/client/:clientName/:clientId" component={Client} />
            <Route exact name="moduleGraph" path="/module/graph/:moduleName/:moduleId" component={ModuleGraph} />
            <Route exact name="chart" path="/chart" component={MyChart} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};

export default Routes;
