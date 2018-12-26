import React from 'react';

import withDynamicMeta from 'hoc/withDynamicMeta'

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//import StupidHomeBanner from 'HomePage/StupidHomeBanner';
import HomeBanner from 'HomePage/HomeBanner';
import HomeCardRibbon from 'HomePage/HomeCardRibbon';

const styles = (theme) => ({
  container: {
    height: '100%'
  }
});

const Home = ({
    classes,
  }) => (
  <div className="Home">
    <Grid container className={classes.container}>
      <HomeBanner/>
      <HomeCardRibbon/>
    </Grid>
  </div>
);

export default withDynamicMeta(withStyles(styles)(Home));