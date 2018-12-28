import React from 'react';
import withDynamicMeta from 'hoc/withDynamicMeta'
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import ProductCard from 'Common/ProductCard';

import MaxContainer from 'hoc/MaxContainer';

import {
  root,
  pro,
  benchmark,
  api
} from 'App/routes';

import apiIcon from './icons/api.png';
import benchmarkIcon from './icons/benchmark.png';
import customIcon from './icons/custom.png';
import foundationIcon from './icons/foundations.png';

import cardText from 'Static/catalogText';

const styles = (theme) => ({
  root: {
    ...theme.open990.pageContainer,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.75rem'
    }
  },
  paper: {
  },
  container: {
    width: '100%'
  },
  cardHeading: {
    color: theme.color.primary.desaturated
  },
  lineHeader: {
    ...theme.open990.pageTitle,
    margin: '2rem 0 0'
  },
  lineText: {
    fontSize: '1.25rem',
    fontWeight: 300,
    lineHeight: 1.8,
    wordBreak: 'break-word'
  },
  iconCardRibbon: {
    paddingTop: '5rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '3.5rem'
    }
  },
  endpointsText: {
    textAlign: 'left',
    fontSize: '1rem',
    '&>div': {
      fontWeight: 600,
      fontSize: '1.1rem'
    },
    '& li': {
      padding: '0.25rem 0'
    }
  },
  colored: {
    color: theme.color.primary.desaturated
  },
  divider: {
    padding: '2rem 0'
  },
  newLineHeader: {
    '&:before': {
      borderTop: `5px solid ${theme.color.grey.faded}`
    }
  },
  listWrapper: {
    padding: '1rem 0'
  },
  bottomText: {
    paddingTop: '2.5rem',
    lineHeight: 1.5
  },
  link: {
    textDecoration: 'underline',
    color: theme.color.primary.desaturated
  },
  subHeader:{
    fontSize: '1.2rem',
    margin: '1rem 0 2rem'
  }
});

const Catalog = ({
    classes,
  }) => {

  /*const advancedSearchLink = (
    <NavLink to={search} className={classes.link}>
      {'Advanced Search'}
    </NavLink>
  );

  const variableLevelLink = (
    <NavLink to={resources} className={classes.link}>
      {'variable-level files'}
    </NavLink>
  );*/

  return (
    <div className={classNames("Catalog", classes.root)}>
      <MaxContainer classes={{ container: classes.container }}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} md={10} lg={8} className={classes.lineHeader}>
              <h1>Products &amp; Services</h1>
            </Grid>
            <Grid item xs={12} md={10} lg={8} className={classes.subHeader}>
                Browse our products. <br/>
                Free datasets coming soon.
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} md={10} lg={8}>
              <Grid container justify="center" spacing={40}>
                <Grid item xs={12} sm={6}>
                  <ProductCard 
                    icon={foundationIcon}
                    title={'Foundations Dataset'}
                    text={cardText.foundation}
                    firstButtonText={'Info'}
                    firstButtonLink={root}
                    firstButton={false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProductCard 
                    icon={customIcon}
                    title={'Custom Dataset'}
                    text={cardText.customDataset}
                    firstButtonText={'Info'}
                    firstButtonLink={pro}
                    firstButton={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProductCard
                    icon={benchmarkIcon}
                    title={'Benchmark Report'}
                    text={cardText.benchmarkReport}
                    firstButtonText={'Info'}
                    firstButtonLink={benchmark}
                    firstButton={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProductCard 
                    icon={apiIcon}
                    title={'API'}
                    text={cardText.api}
                    firstButtonText={'Info'}
                    firstButtonLink={api}
                    firstButton={true}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <ProductCard
                    icon={foundationIcon}
                    title={'Foundation Dataset'}
                    text={'Body Text'}
                    firstButtonText={'Info'}
                    firstButtonLink={root}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProductCard
                    icon={foundationIcon}
                    title={'Foundation Dataset'}
                    text={'Body Text'}
                    firstButtonText={'Info'}
                    firstButtonLink={root}
                  />
                </Grid> */}
              </Grid>
              {/* <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item xs={12} sm={10}>
                    <div className={classes.bottomText}>
                      Looking for free data?
                      <br />
                      See if our {advancedSearchLink} for nonprofit profiles or our {variableLevelLink} meet your needs.
                    </div>
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </MaxContainer>
    </div>
  )
}

export default withDynamicMeta(withStyles(styles)(withRouter(Catalog)));

