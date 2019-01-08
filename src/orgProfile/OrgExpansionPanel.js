/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import OrgDataTable from './OrgDataTable';
import StyledPanel from "./StyledPanel";
import Grid from '@material-ui/core/Grid';

const styles = () => ({});
class OrgExpansionPanel extends React.Component {
    constructTableChild(childData) {
        let table_id = childData.table_id;
        return (
          <OrgDataTable
            key={childData.table_id}
            table_id={table_id}
            periods={this.props.periods}
          />
        );
    }
   
    constructPanelChild(childData) {
        return (
          <Grid key = {childData.card_id} item xs={12}>
              <Grid container spacing={24}>
                  <Grid item xs={12}>
                      <OrgExpansionPanel
                        raw={childData}
                        periods={this.props.periods}
                      />
                  </Grid>
              </Grid>
          </Grid>
        );
    }
    /*constructPanelChild(childData) {
        return (<div></div>);
    }*/
    
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

    getLabel() {
        return this.props.raw.body;
    }
    
    startExpanded() {
        return "toc" in this.props.raw;
    }
    
    constructExpansionPanel() {
        const {card, card_id} = this.props.raw;
        return (
          <StyledPanel id={card_id} label={this.getLabel()} startExpanded={this.startExpanded()} displayMode={card}>
              <Grid container spacing={24}>
                  {this.constructChildren()}
              </Grid>
          </StyledPanel>
        );
    }
    
    render() {
        return (<div>{this.constructExpansionPanel()}</div>);
    }
}

export default withStyles(styles)(OrgExpansionPanel);
