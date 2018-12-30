import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({});


class OrgProfileDetails extends React.Component {
  
  render() {
    return (<Fragment>
      <Grid item xs={12}>
        <DummyExpansionPanel/>
      </Grid>
      <Grid item xs={6}>
        <DummyExpansionPanel/>
      </Grid>
      <Grid item xs={6}>
        <DummyExpansionPanel/>
      </Grid>
      <Grid item xs={3}>
        <DummyExpansionPanel/>
      </Grid>
      <Grid item xs={3}>
        <DummyExpansionPanel/>
      </Grid>
      <Grid item xs={3}>
        <DummyExpansionPanel/>
      </Grid>
      <Grid item xs={3}>
        <DummyExpansionPanel/>
      </Grid>
    </Fragment>);
  }
}

export default withStyles(styles)(OrgProfileDetails);
