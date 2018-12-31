import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import OrgDataTable from './OrgDataTable';
import StyledPanel from "./StyledPanel";

const styles = () => ({});
class OrgExpansionPanel extends Component {
    constructTableChild(childData) {
        let table_id = childData.table_id;
        return (
          <div>Data table goes here</div>
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

    constructExpansionPanel() {
        return (
          <StyledPanel {...this.props} />
        );
    }

    render() {
        return (<div>{this.constructExpansionPanel()}</div>);
    }
}

export default withStyles(styles)(OrgExpansionPanel);
