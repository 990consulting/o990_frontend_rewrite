import React from 'react';
import withDynamicMeta from 'hoc/withDynamicMeta'
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';

import MaxContainer from 'hoc/MaxContainer';

import {
  demoOrg
} from 'App/routes'

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
  )
};

export default withDynamicMeta(withStyles(styles)(Api));
