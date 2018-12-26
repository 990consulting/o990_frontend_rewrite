import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import withViewCheck from 'hoc/withViewCheck';

import { searchOrganizationByQuery } from 'api/search';
import HomeBanner from 'HomePage/HomeBanner'

const styles = theme => ({}); // TODO Is this boilerplate needed?

class PeopleHomeBanner extends React.Component {
  //headline = (<h1>View executive compensation and trustee data from {isViewLg && <br/>} <span>1,808,718</span> organizations.</h1>);
  headline = (<h1>View executive compensation and trustee data from {<br/>} <span>1,808,718</span> organizations.</h1>);
  
  render() {
    return (<HomeBanner headline={this.headline} />);
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(PeopleHomeBanner)));
