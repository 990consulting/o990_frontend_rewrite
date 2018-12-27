import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomeOrg from 'HomePage/HomeOrg';
import HomePeople from 'HomePage/HomePeople';

import {
  root,
  organization,
  people
} from 'App/routes';

class SiteRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={root} exact render={() => (
          <Redirect to={organization} />
        )} />
        <Route path={organization} exact render={(props) => (
          <HomeOrg {...props} />
        )} />
        <Route path={people} exact render={(props) => (
          <HomePeople {...props} />
        )} />
      </Switch>
    )
  }
}

export default withRouter(SiteRouter);
