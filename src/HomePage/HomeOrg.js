/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import withDynamicMeta from 'hoc/withDynamicMeta'
import withStyles from '@material-ui/core/styles/withStyles';
import Home from 'HomePage/Home';
import apiClient from 'App/ApiClient';
import { orgASProps } from 'Common/autosuggestProperties'

const styles = (theme) => ({});

class HomeOrg extends React.Component {
  headline = (<h1>Explore profiles on <span>1,808,718</span> nonprofits.</h1>);
 
  render() {
    const { location } = this.props;
    return (<Home
      headline={this.headline}
      asProps={orgASProps}
      activeTab={0}
      location = {location}
      searchByQuery = {apiClient.searchOrganizationByQuery}
    />);
  }
}

export default withDynamicMeta(withStyles(styles)(HomeOrg));
