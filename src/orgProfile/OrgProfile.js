import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import SidebarPage from 'sidebarPage/SidebarPage';
import { styles } from 'orgProfile/orgProfileStyles'
import withViewCheck from 'hoc/withViewCheck';

class OrganizationProfile extends React.Component {
  render() {
    const sidebarContent = (<h2>Sidebar content</h2>);
    const bodyContent = (<h2>Body content</h2>);
    return (<SidebarPage sidebarContent={sidebarContent} bodyContent={bodyContent} />);
  }
}

export default withStyles(styles)(withViewCheck()(OrganizationProfile));
