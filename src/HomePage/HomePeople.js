import React from 'react';

import withDynamicMeta from 'hoc/withDynamicMeta'
import withStyles from '@material-ui/core/styles/withStyles';
import Home from 'HomePage/Home';

import { peopleASProps } from 'Common/autosuggestProperties'

const styles = (theme) => ({});

class HomePeople extends React.Component {
  headline = (<h1>View executive compensation and trustee data from {this.props.isViewLg && <br/>} <span>1,808,718</span> organizations.</h1>);
  
  render() {
    return (<Home headline={this.headline} asProps={peopleASProps} activeTab={1} {...this.props} />);
  }
}

export default withDynamicMeta(withStyles(styles)(HomePeople));
