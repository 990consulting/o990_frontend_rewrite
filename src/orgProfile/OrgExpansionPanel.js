import React, { Component } from 'react';
import OrgDataTable from './OrgDataTable';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { styles } from 'orgProfile/orgProfileDetailStyles';

class OrgExpansionPanel extends Component {
    constructTableChild(childData) {
        return (<div>I'm a child table</div>);
        /*
        let table_id = childData.table_id;
        return (
          <Grid container item xs={12}>
            <OrgDataTable key={"table_" + childData.table_id} table_id={table_id} periods={this.props.periods} delay={0} />
          </Grid>
        );*/
    }
    
    constructPanelChild(childData) {
        return (<div>I'm a child panel</div>);
        /*return (
          <Grid container item xs={12}>
            <OrgExpansionPanel classes={this.props.classes} key={"panel_" + childData.card_id} raw={childData} periods={this.props.periods} />
          </Grid>
        );*/
    }
    
    constructChild(childData) {
        let childType = childData["type"]; // Is "type" a protected keyword in Javascript?
        if (childType === "table") {
            return this.constructTableChild(childData);
        } else if (childType === "nested") {
            return this.constructPanelChild(childData);
        }
        throw new Error("Unexpected child type '" + childType + "'");
        
        
    }
    constructChildren() {
        let childContent = this.props.raw.content;
        let children = [];
        for (let i = 0; i < childContent.length; i++) {
            let child = this.constructChild(childContent[i]);
            children.push(child)
        }
        return children;
    }
    
    constructDetailPanel() {
        const {classes} = this.props;
        return (
          <ExpansionPanelDetails classes={{/*root: classes.expansionDetails*/}}>
              <div>
                  {this.constructChildren()}
              </div>
          </ExpansionPanelDetails>
        );
    }
    
    startExpanded() {
        return "toc" in this.props.raw;
    }
    
    constructExpansionPanel() {
        const {classes} = this.props;
        return (
          <ExpansionPanel
            id={this.props.raw.card_id}
            CollapseProps = {{ unmountOnExit: true }}
            defaultExpanded = { this.startExpanded() }
            key={this.props.raw.card_id}
            classes={{expanded: classes.expanded}}
          >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                classes = {{
                    root: classes.summary,
                    content: classes.summaryContent
                }}
              >
                  <Typography className={classes.heading2}>
                      {this.props.raw.body}
                  </Typography>
              </ExpansionPanelSummary>
              {this.constructDetailPanel()}
          </ExpansionPanel>
        );
    }
    
    render() {
        return (<div>{this.constructExpansionPanel()}</div>);
    }
}

export default withStyles(styles)(OrgExpansionPanel);
