/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import SidebarPage from 'sidebarPage/SidebarPage';
import { styles } from 'orgProfile/orgProfileStyles'
import { withRouter } from 'react-router-dom';
import apiClient from 'api';
import OrgProfileHeader from "./OrgProfileHeader";
import OrgProfileDetails from "./OrgProfileDetails";
import OrgProfileSidebarContent from './OrgProfileSidebarContent'
import Loader from 'react-loader-spinner'

class OrganizationProfile extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      header: null,
      res: null,
      body: null,
      periods: null,
      error: false
    }
  }
  
  componentDidMount() {
    const ein = this.props.match.params.ein;
    let rel = `/api/org/skeleton/${ein}/`;
    apiClient.get(rel)
      .then(res => {
        this.setState({
          loaded: true,
          header: res.data.header,
          body: res.data.body,
          periods: res.data.periods
        });
      }).catch(error => {
        this.setState({
          error: true
        })
    });
  }
 
  render() {
    const { loaded, header, body, periods, error } = this.state;
    const { classes } = this.props;
    if (loaded) {
      const bodyContent = (<Fragment>
        <OrgProfileHeader content={header} />
        <OrgProfileDetails body={body} periods={periods} />
      </Fragment>);
      const sidebarContent = <OrgProfileSidebarContent body={body} />
      return (<SidebarPage sidebarContent={sidebarContent} bodyContent={bodyContent} />);
    } else if (error) {
      return <div>Something went wrong</div>
    } else {
      return (<div className={classes.loaderWrapper}>
        <Loader
          type='ThreeDots'
          color='#6839d3'
          height='75'
          width='75'
        />
      </div>)
    }
  }
}

export default withStyles(styles)(withRouter(OrganizationProfile));
