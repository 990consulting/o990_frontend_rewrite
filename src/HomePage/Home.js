/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';

import withDynamicMeta from 'hoc/withDynamicMeta'

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//import StupidHomeBanner from 'HomePage/StupidHomeBanner';
import HomeCardRibbon from 'HomePage/HomeCardRibbon';
import HomeBanner from 'HomePage/HomeBanner';

const styles = (theme) => ({
  container: {
    height: '100%'
  }
});

class Home extends React.Component {
  render() {
    const { headline, asProps, activeTab, searchByQuery } = this.props;
    return (
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
    );
  }
}

export default withDynamicMeta(withStyles(styles)(Home));