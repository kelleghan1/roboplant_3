import React from 'react';
import { withRouter } from 'react-router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import Client from './components/Client';
import ModuleGraphs from './components/ModuleGraphs';
import ModuleSpreadsheets from './components/ModuleSpreadsheets';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-routes">
          <Switch>
            <Route exact name="home" path="/" component={Home} />
            <Route exact name="client" path="/client/:clientName/:clientId" component={Client} />
            <Route exact name="moduleGraphs" path="/module/graphs/:clientName/:moduleName/:moduleId" component={ModuleGraphs} />
            <Route exact name="ModuleSpreadsheets" path="/module/spreadsheets/:clientName/:moduleName/:moduleId" component={ModuleSpreadsheets} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};

export default Routes;
