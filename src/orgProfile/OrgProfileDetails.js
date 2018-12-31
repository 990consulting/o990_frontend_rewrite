import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from 'orgProfile/orgProfileStyles';
import OrgExpansionPanel from "orgProfile/OrgExpansionPanel";

class OrgProfileDetails extends React.Component {
  constructChild(i) {
    let childContent = this.props.body[i];
    return <OrgExpansionPanel key={"card_" + childContent.card_id} periods={this.props.periods} raw={childContent} />
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
    return (<Fragment>{this.constructTopLevelPanels()}</Fragment>);
  }
}

export default withStyles(styles)(OrgProfileDetails);
