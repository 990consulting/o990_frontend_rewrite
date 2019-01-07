/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//import StupidHomeBanner from 'HomePage/StupidHomeBanner';
import HomeCardRibbon from 'HomePage/HomeCardRibbon';
import HomeBanner from 'HomePage/HomeBanner';
const styles = () => ({
  container: {
    height: '100%'
  }
});

class Home extends React.Component {
  render() {
    const { headline, asProps, activeTab, searchByQuery } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>Open990 | Explore nonprofit profiles for free</title>
          <meta name="description" content="Search database of charities, foundations, and other nonprofits--revenues, compensation, fundraising, mission, etc. View profiles free, no registration." />
          <meta name="robots" content="all"/>
        </Helmet>
        <div className="Home">
          <Grid container className={this.props.classes.container}>
            <HomeBanner
              headline={headline}
              asProps={asProps}
              activeTab={activeTab}
              searchByQuery={searchByQuery}
            />
            <HomeCardRibbon/>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);