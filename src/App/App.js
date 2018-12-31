/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import SiteRouter from 'App/SiteRouter';
import AppMenu from 'App/AppMenu';
import AppFooter from 'App/AppFooter';

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

/*
        </main>
* */
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
          <SiteRouter />
        </main>
        <AppFooter />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));