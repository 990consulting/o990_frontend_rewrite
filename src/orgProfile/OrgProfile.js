import React, { Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import SidebarPage from 'sidebarPage/SidebarPage';
import { styles } from 'orgProfile/orgProfileStyles'
import { withRouter } from 'react-router-dom';
import apiClient from 'api';
import OrgProfileHeader from "./OrgProfileHeader";
import OrgProfileDetails from "./OrgProfileDetails";
import OrgProfileSidebarContent from './OrgProfileSidebarContent'

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
    let bodyContent = null;
    let sidebarContent = null;
    if (loaded) {
      bodyContent = (<Fragment>
        <OrgProfileHeader content={header} />
        <OrgProfileDetails body={body} periods={periods} />
      </Fragment>);
      sidebarContent = <OrgProfileSidebarContent body={body} />
    } else if (error) {
      bodyContent = (<h2>Something went wrong</h2>);
    } else {
      bodyContent = (<h2>I'm loading</h2>);
    }
    return (<SidebarPage sidebarContent={sidebarContent} bodyContent={bodyContent} />);
  }
}

export default withStyles(styles)(withRouter(OrganizationProfile));
