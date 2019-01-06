/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Home from 'HomePage/Home';

import { peopleASProps } from 'Common/autosuggestProperties'

const styles = (theme) => ({});

class HomePeople extends React.Component {
  headline = (<h1>View executive compensation and trustee data from {this.props.isViewLg && <br/>} <span>1,808,718</span> organizations.</h1>);
  
  render() {
    const { location } = this.props;
    
    return (<Home headline={this.headline} asProps={peopleASProps} activeTab={1} location={location} />);
  }
}

export default withStyles(styles)(HomePeople);
