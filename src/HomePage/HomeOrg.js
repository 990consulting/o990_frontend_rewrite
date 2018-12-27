import React from 'react';

import withDynamicMeta from 'hoc/withDynamicMeta'
import withStyles from '@material-ui/core/styles/withStyles';
import Home from 'HomePage/Home';

const styles = (theme) => ({});

class HomeOrg extends React.Component {
  headline = (<h1>Explore profiles on <span>1,808,718</span> nonprofits.</h1>);
  
  render() {
    return (<Home headline={this.headline} {...this.props} />);
  }
}

export default withDynamicMeta(withStyles(styles)(HomeOrg));
