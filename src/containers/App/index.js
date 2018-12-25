import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'; 
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import AppMenu from 'components/AppMenu';
import AppFooter from 'components/AppFooter';
import PrivacyBaner from 'components/PrivacyBaner';

import Home from 'containers/Home';
import Search from 'containers/Search';
import PeopleSearch from 'containers/PeopleSearch';
import OrganizationProfile from 'containers/OrganizationProfile';
import CopyrightPolicy from 'containers/CopyrightPolicy';
import TermsOfService from 'containers/TermsOfService';
import PrivacyPolicy from 'containers/PrivacyPolicy';
import Contact from 'containers/Contact';
import Benchmark from 'containers/Benchmark';
import Pro from 'containers/Pro';
import Resources from 'containers/Resources';
import Api from 'containers/Api';
import ProductCatalog from 'containers/ProductCatalog';
import DataSearchResult from 'containers/DataSearchResult';
import NotFound from 'containers/NotFound';

import ScrollToTop from 'hoc/ScrollToTop';

import { getPageMeta } from 'api/meta'; 
import { siteIsVisited, showPrivacyBanner } from 'actions/helpers';

import { title, description } from 'constants/meta'; 
import {
  root,
  search,
  peopleSearch,
  copyrightPolicy,
  organizationProfile,
  termsOfService,
  privacyPolicy,
  benchmark,
  contact,
  pro,
  customData,
  resources,
  api,
  productCatalog,
  data,
  searchData,
  organization,
  people
} from 'routes/internal';

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

class App extends Component {
  state = { 
    title: this.props.title || title, 
    description : this.props.description || description,
    noIndex: this.props.noIndex || false
  };

  setMetaInfo = () => {
    getPageMeta(this.props.location.pathname).then(res => { 
      const { title: apiTitle, description: apiDescription, noindex } = res.data; 
      this.setState({ 
        title: apiTitle, 
        description: apiDescription,
        noIndex: noindex
      }) 
    }).catch(error => {
      console.log(`Meta not provided for ${this.props.location.pathname} route`);
      this.setState({ 
        title, 
        description,
        noIndex: false
      });
    });
  }

  componentDidMount() {
    const { 
      siteIsVisited, 
      isSiteAlreadyVisited,
      isPrivacyBanerShown,
      showPrivacyBanner
    } = this.props;
    this.setMetaInfo();

    if(!isSiteAlreadyVisited) {
      siteIsVisited();
    } else if (isSiteAlreadyVisited && isPrivacyBanerShown){
      showPrivacyBanner();
    }
  }
 
  componentDidUpdate(prevProps) { 
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.setMetaInfo();
    }
  } 

  render() {
    const { classes, isOrganizationSearchMode } = this.props;
    const { 
      title: apiTitle, 
      description: apiDescription,
      noIndex
    } = this.state;

    return (
      <div className={classNames('App', classes.root)}>
        <ScrollToTop>
          <Fragment>
            <AppMenu />
            <main className={classes.content}>
              <Switch>
               <Route path={root} exact render={() =>(
                   isOrganizationSearchMode ? 
                    <Redirect to={organization} /> :
                    <Redirect to={people} />
                )} />
                <Route path={organization} exact render={(props) => (
                  <Home 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={people} exact render={(props) => (
                  <Home 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={search} render={(props) => (
                  <Search 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={peopleSearch} render={(props) => (
                  <PeopleSearch 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={organizationProfile} render={(props) => (
                  <OrganizationProfile 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={copyrightPolicy} exact render={(props) => (
                  <CopyrightPolicy
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={termsOfService} exact render={(props) => (
                  <TermsOfService
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={privacyPolicy} exact render={(props) => (
                  <PrivacyPolicy 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={contact} exact render={(props) => (
                  <Contact 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={benchmark} exact render={(props) => (
                  <Benchmark 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={pro} exact render={() =>(
                   <Redirect to={customData} />
                )} />
                <Route path={customData} exact render={(props) => (
                  <Pro
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={resources} exact render={(props) => (
                  <Resources 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={api} exact render={(props) =>(
                  <Api
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={productCatalog} exact render={(props) =>(
                  <ProductCatalog
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={searchData} exact render={(props) =>(
                  <DataSearchResult
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
                <Route path={data} exact render={() =>(
                   <Redirect to={resources} />
                )} />
                <Route path={root} render={(props) => (
                  <NotFound 
                    {...props}
                    title={apiTitle}
                    description={apiDescription}
                    noIndex={noIndex}
                  />
                )} />
              </Switch>
              <PrivacyBaner />
            </main>
            <AppFooter />
          </Fragment>
        </ScrollToTop>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSiteVisited: state.helpers.isSiteAlreadyVisited,
  isPrivacyBanerShown: state.helpers.isPrivacyBanerShown,
  isOrganizationSearchMode: state.search.isOrganizationSearchMode  
});

const mapDispatchToProps = (dispatch) => ({
  siteIsVisited: () => {
    dispatch(siteIsVisited())
  },
  showPrivacyBanner: () => {
    dispatch(showPrivacyBanner())
  }
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App)));