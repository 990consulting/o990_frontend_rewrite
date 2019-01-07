/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from 'orgProfile/orgProfileStyles';
import OrgExpansionPanel from "orgProfile/OrgExpansionPanel";
import Grid from '@material-ui/core/Grid';

class OrgProfileDetails extends React.Component {
  constructChild(i) {
    let childContent = this.props.body[i];
    return (<Grid item xs={12}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <OrgExpansionPanel key={"card_" + childContent.card_id} periods={this.props.periods} raw={childContent} />
        </Grid>
      </Grid>
    </Grid>);
  }
  constructTopLevelPanels() {
    let children = [];
    for (let i = 0; i < this.props.body.length; i++) {
      let child = this.constructChild(i);
      children.push(child);
    }
    return children;
  }
  
  render() {
    return (<Grid container spacing={24}>
      {this.constructTopLevelPanels()}
    </Grid>);
  }
}

export default withStyles(styles)(OrgProfileDetails);
