import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles/index';

import App from 'containers/App';

import theme from 'theme';
import './App.css';
import 'react-table/react-table.css'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </MuiThemeProvider>, document.getElementById('root')
);
