import React from 'react';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Banner from 'components/HomeBanner';
import HomeCardRibbon from 'components/HomeCardRibbon';

const styles = (theme) => ({
  container: {
    height: '100%'
  }
});

const Home = ({
    classes,
    title,
    description,
    noIndex
  }) => (
  <div className="Home">
    <Helmet defer={false}>
      <title>{title}</title>
      <meta name="description" content={description} />
      { noIndex && <meta name="robots" content='noindex' /> } 
    </Helmet>
    <Grid container className={classes.container}>
      <Banner/>
      <HomeCardRibbon/>
    </Grid>
  </div>
);

export default withStyles(styles)(Home);