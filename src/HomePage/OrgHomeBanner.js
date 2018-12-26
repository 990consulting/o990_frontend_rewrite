import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import withViewCheck from 'hoc/withViewCheck';

import { searchOrganizationByQuery } from 'api/search';
import HomeBanner from 'HomePage/HomeBanner'

const styles = theme => ({}); // TODO Is this boilerplate needed?

class OrgHomeBanner extends React.Component {
  headline = (<h1>Explore profiles on <span>1,808,718</span> nonprofits.</h1>);
  
  render() {
    return (<HomeBanner headline={this.headline} />);
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(OrgHomeBanner)));
