import React from 'react';

import withDynamicMeta from 'hoc/withDynamicMeta'
import withStyles from '@material-ui/core/styles/withStyles';
import Home from 'HomePage/Home';

import { orgASProps } from 'Common/autosuggestProperties'

const styles = (theme) => ({});

class HomeOrg extends React.Component {
  headline = (<h1>Explore profiles on <span>1,808,718</span> nonprofits.</h1>);
 
  /* Autosuggest properties specific to org search*/
  asProps = {
  };
  
  render() {
    return (<Home headline={this.headline} asProps={orgASProps} {...this.props} />);
  }
}

export default withDynamicMeta(withStyles(styles)(HomeOrg));
