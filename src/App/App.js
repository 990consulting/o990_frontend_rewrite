import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import AppMenu from 'App/AppMenu';
import AppFooter from 'App/AppFooter';

import Home from 'HomePage/Home';

import { getPageMeta } from 'api/meta';

import {
  root,
  organization,
  people
} from 'App/routes';

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

const defaultTitle = 'Open990 - Home - free nonprofit data';
const defaultDescription = `Open990's free data profiles reveal trends on salary, expenses, and financial indicators for over a half million US tax-exempt foundations and charities. Unlocking open IRS Form 990 tax records to empower nonprofit leaders, journalists, and donors through data science.`;

class App extends React.Component {
  state = { 
    title: this.props.title || defaultTitle,
    description : this.props.description || defaultDescription,
    noIndex: this.props.noIndex || false
  };

  setMetaInfo = () => {
    getPageMeta(this.props.location.pathname).then(res => {
      const { title, description, noindex } = res.data;
      this.setState({
        title: title,
        description: description,
        noIndex: noindex
      }) 
    }).catch(error => {
      console.log(`Meta not provided for ${this.props.location.pathname} route`);
      this.setState({ 
        defaultTitle,
        defaultDescription,
        noIndex: false
      });
    });
  }

  componentDidMount() {
    this.setMetaInfo();
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
        </main>
        <AppFooter />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));