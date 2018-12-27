import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import AppMenu from 'App/AppMenu';
import AppFooter from 'App/AppFooter';

import HomeOrg from 'HomePage/HomeOrg';
import HomePeople from 'HomePage/HomePeople';

import {
  root,
  organization,
  people
} from 'App/routes';

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.color.background.faded,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});


class App extends React.Component {
  /*constructor(props) {
    super(props);
    //console.log("Props for app constructor: " + JSON.stringify(props));
  }*/
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classNames('App', classes.root)}>
        <AppMenu />
        <main className={classes.content}>
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
        </main>
        <AppFooter />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));