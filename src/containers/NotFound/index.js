import React, { PureComponent } from 'react';
import NavLink from 'react-router-dom/NavLink';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import MaxContainer from 'hoc/MaxContainer';

import {
  root,
  notFound
} from 'routes/internal';

const styles = (theme) => ({
  root: {
    ...theme.open990.pageContainer,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh'
  },
  notFound: {
    '& a': {
      color: theme.color.primary.desaturated
    }
  },
  link:{
    ...theme.open990.link,
    textDecoration: 'none'
  }
});

class NotFound extends PureComponent {

  componentWillMount() {
    const { history } = this.props
    history.replace(notFound);    
  }

  render() {
    const { 
      classes, 
      title, 
      description, 
      noIndex 
    } = this.props

    return (
      <div className={classNames(
        'NotFoundPage',
        classes.root
      )}>
        <MaxContainer>
        <Helmet defer={false}>
          <title>{title}</title>
          <meta name="description" content={description} />
          { noIndex && <meta name="robots" content='noindex' /> } 
        </Helmet>
          <Grid container className={classes.notFound}>
            <Grid item xs={12}>
              <h1>404</h1>
              <h2>Sorry, this page could not be found.</h2>
              <p>
                Return to the <NavLink className={classes.link} to={root}>homepage</NavLink>
              </p>
            </Grid>
          </Grid>
        </MaxContainer>
      </div>
    )
  }
};

export default withStyles(styles)(NotFound);

