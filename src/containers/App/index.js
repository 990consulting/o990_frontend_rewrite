import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'; 
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import AppMenu from 'components/AppMenu';
import AppFooter from 'components/AppFooter';
import PrivacyBanner from 'components/PrivacyBanner';

import Home from 'containers/Home';

import { getPageMeta } from 'api/meta'; 
import { siteIsVisited, showPrivacyBanner } from 'actions/helpers';

import { title, description } from 'constants/meta'; 
import {
  root,
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

class App extends React.Component {
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
      isPrivacyBannerShown: isPrivacyBannerShown,
      showPrivacyBanner
    } = this.props;
    this.setMetaInfo();

    if(!isSiteAlreadyVisited) {
      siteIsVisited();
    } else if (isSiteAlreadyVisited && isPrivacyBannerShown){
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
          </Switch>
          <PrivacyBanner />
        </main>
        <AppFooter />
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