import React, { Component } from 'react';
import OrgDataTable from './OrgDataTable';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from 'orgProfile/orgProfileStyles';

class OrgExpansionPanel extends Component {
    constructTableChild(childData) {
        let table_id = childData.table_id;
        return (
            <OrgDataTable key={"table_" + childData.table_id} table_id={table_id} periods={this.props.periods} delay={0} />
        );
    }

    constructPanelChild(childData) {
        return (<OrgExpansionPanel key={"panel_" + childData.card_id} raw={childData} periods={this.props.periods} />);
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
        return (
                <ExpansionPanelDetails>
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
        return (
                <ExpansionPanel CollapseProps = {{ unmountOnExit: true }} defaultExpanded = { this.startExpanded() } >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{this.props.raw.body}</Typography>
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
