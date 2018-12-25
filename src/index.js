import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from 'store/configure-store';
import { history } from 'historyInstance';
import { ConnectedRouter } from 'react-router-redux';

import { MuiThemeProvider } from '@material-ui/core/styles/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import faGit from '@fortawesome/fontawesome-free-brands/faGit';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import App from 'containers/App';

import theme from 'theme';
import './App.css';
import 'react-table/react-table.css'

const {store, persistor} = configureStore();

library.add(
  faGit,
  faLinkedin,
  faEnvelope,
  faBars
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>, document.getElementById('root')
);
