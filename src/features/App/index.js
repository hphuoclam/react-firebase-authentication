import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.scss';
import Navigation from "../Navigation"
import RouteLayout from "./RouteLayout"
import { withAuthentication } from '../Session';
import routes from "./routes";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <div className="content">
        {
          routes.map((route, key) => <Route key={key} path={route.path} exact={route.exact} render={props => (
            <RouteLayout  title={route.title}>
              <route.component {...props} />
            </RouteLayout>
          )} />)
        }
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
