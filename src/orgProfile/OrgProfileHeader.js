/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import InfoCard from 'orgProfile/InfoCard';
import MarqueeCard from 'orgProfile/MarqueeCard';
import Grid from '@material-ui/core/Grid';
import { styles } from 'orgProfile/orgProfileStyles';

class OrgProfileHeader extends React.Component {
  
  getOrgName() {
    const {content} = this.props;
    if (content.name) {
      return content.name
    } else {
      return "Unknown organization";
    }
  }
 
  makeTopCard(i) {
    const { classes, content } = this.props;
    const cardContent = content.vitals[i];
    const cols = 12 / content.vitals.length;
    const label = cardContent.label;
    const lines = cardContent.lines;
    return (<Grid key={'info-card-' + i} item xs={12} md={cols}>
      <InfoCard
        classes={{
          extendedPaper: classes.paper,
          extendedText: classes.text
        }}
        titleText={label}
        bodyText={lines}
      />
    </Grid>);
  }
  
  getTopCards() {
    const {content} = this.props;
    if (!content.vitals) {
      return [];
    }
    
    const ret = [];
    for (let i = 0; i < content.vitals.length; i++) {
      const card = this.makeTopCard(i);
      ret.push(card);
    }
    return ret;
  }
  
  getMarquee() {
    return this.props.content.marquee;
  }
  
  render() {
    const { classes }  = this.props;
    const orgName = this.getOrgName();
    const topCards = this.getTopCards();
    const marquee = this.getMarquee();
    
    return (<Fragment>
      <Grid item xs={12}>
        <h3 className={classes.cardHeader}>{orgName}</h3>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={24} className={classes.contactList}>
          {topCards}
        </Grid>
      </Grid>
      { marquee && <Grid item xs={12}>
        <MarqueeCard marquees={marquee}/>
      </Grid> }
    </Fragment>);
  }
}

export default withStyles(styles)(OrgProfileHeader);
