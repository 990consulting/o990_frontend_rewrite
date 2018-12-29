import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import InfoCard from 'orgProfile/InfoCard';
import MarqueeCard from 'orgProfile/MarqueeCard';
import Grid from '@material-ui/core/Grid';

const styles = () => ({});

class OrgProfileDummyContent extends React.Component {
  render() {
    const { classes }  = this.props;
    const marquee=[{
      "label": "Headline label",
      "lines": ["Line 1", "Line 2"]
    }];
    
    return (<Fragment>
      <Grid item xs={12}>
        <h3 className={classes.cardHeader}>Org name goes here</h3>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={24} className={classes.contactList}>
          <Grid key={`info-card-1`} item xs={12} md={4}>
            <InfoCard
              classes={{
                extendedPaper: classes.paper,
                extendedText: classes.text
              }}
              titleText="Card 1"
              bodyText={["Line 1", "Line 2", "Line 3"]}
            />
          </Grid>
          <Grid key={`info-card-2`} item xs={12} md={4}>
            <InfoCard
              classes={{
                extendedPaper: classes.paper,
                extendedText: classes.text
              }}
              titleText="Card 2"
              bodyText={["Line 1", "Line 2", "Line 3"]}
            />
          </Grid>
          <Grid key={`info-card-3`} item xs={12} md={4}>
            <InfoCard
              classes={{
                extendedPaper: classes.paper,
                extendedText: classes.text
              }}
              titleText="Card 3"
              bodyText={["Line 1", "Line 2", "Line 3"]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MarqueeCard marquees={marquee}/>
      </Grid>
    </Fragment>);
  }
}

export default withStyles(styles)(OrgProfileDummyContent);
