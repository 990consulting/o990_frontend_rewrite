/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import MaxContainer from 'hoc/MaxContainer';

const styles = (theme) => ({
  root: {
    ...theme.open990.pageContainer,
    wordBreak: 'break-word'
  },
  defaultText:{
    marginTop: '10%',
    color: theme.color.black,
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: theme.typography.fontFamily.main,
  }
});

const Api = ({
     classes,
   }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Open990 &ndash; Free and paid APIs</title>
        <meta name="description" content="Display nonprofit data on your own website with selected data fields retrieved on demand. Free and paid options available." />
        <meta name="robots" content="all"/>
      </Helmet>
      <div className={classNames("Api", classes.root)}>
        <MaxContainer classes={{container: classes.container}}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} md={10} className={classes.defaultText}>
                <h1>We are currently in the process of updating our API offerings. <br/> Please check back soon!</h1>
              </Grid>
            </Grid>
          </Grid>
        </MaxContainer>
      </div>
    </Fragment>
  )
};

export default withStyles(styles)(Api);
