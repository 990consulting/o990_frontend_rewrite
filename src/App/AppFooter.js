import React, {Component} from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import MaxContainer from 'util/MaxContainer';

import {
  termsOfService,
  privacyPolicy,
  copyrightPolicy,
} from 'routes/internal';

import {
  aws
} from 'routes/external';

const styles = (theme) => ({
  root: {
    zIndex: 999,
    padding: '2.5rem 0',
    background: theme.color.grey.faded,
    borderTop: `5px solid ${theme.color.grey.standard}`,
    fontSize: '0.875rem',
    lineHeight: 1.8,
    '& a': {
      ...theme.open990.link,
      textDecoration: 'none'
    },
    [theme.breakpoints.down(theme.open990.globalContainer.maxWidth)]: {
      padding: '2.5rem 2rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '2.5rem 1rem'
    }
  },
  container: {
    textAlign: 'justify',
    margin: '0 auto'
  },
  copyrightLinks: {
    '& a': {
      borderBottom: `1px dotted ${theme.color.black}`,
      color: theme.color.black,
      '&:hover': {
        borderBottom: `1px solid ${theme.color.black}`
      }
    }
  },
  separator: {
    padding: '0 0.5rem'
  }
});

class AppFooter extends Component {
  render() {
    const {classes} = this.props;

    return (
      <footer className={classes.root}>
        <MaxContainer>
          <Grid item xs={12} className={classes.container}>
            <Grid container>
              <Grid item xs={12}>
                The search engine and database powering this website is generously supported by the&nbsp;
                <a href={aws}>AWS Cloud Credits for Research program.</a>
              </Grid>
              <Grid item xs={12}>
                Copyrights © 2017-2018 990 Consulting, LLC. All Rights Reserved.
              </Grid>
              <Grid item xs={12}>
                <div className={classes.copyrightLinks}>
                  <a href={termsOfService} rel="nofollow">Terms of Service</a>
                  <span className={classes.separator}>/</span>
                  <a href={privacyPolicy} rel="nofollow">Privacy Policy</a>
                  <span className={classes.separator}>/</span>
                  <a href={copyrightPolicy} rel="nofollow">DMCA Policy</a>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </MaxContainer>
      </footer>
    );
  }
}

export default withStyles(styles)(AppFooter);