/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { styles } from 'sidebarPage/sidebarStyles';
import { withRouter } from 'react-router-dom';

class OrgProfileSidebarContent extends React.Component {
  
  onLinkClick = (id) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) {
      console.log("Could not find element " + id);
    }
    element.scrollIntoView({block: "end"});
    //const {history} = this.props;
    //const pathname = history.location.pathname;
    //history.push(`${pathname}#${href}`)
  };
  
  buildTocItem(item) {
    const { classes } = this.props;
    return(
      <div className={classes.tocList} key={`toc-list-${item.card_id}`}>
        <div
          className={classNames(classes.tocItem, classes.link)}
          onClick={() => this.onLinkClick(item.card_id)}
        >
          <span className={classNames(classes.tocDot)}>{item.body}</span>
        </div>
        <div className={classes.tocItem}>
          {this.buildToc(item.content)}
        </div>
      </div>
    )
  }
  
  buildToc(data) {
    const ret = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.type === 'nested' && item.toc && item.content) {
        const tocItem = this.buildTocItem(item);
        ret.push(tocItem);
      }
    }
    return ret;
  }
  
  render() {
    const {body, classes} = this.props;
    const style = {
      'position': 'relative',
      'top': '-53px'
    };
  
    return(<Grid container className={classes.menu} style={style} id="sidebar">
      <div>
        <h2>Contents</h2>
      </div>
      {this.buildToc(body)}
    </Grid>);
  }
}

export default withRouter(withStyles(styles)(OrgProfileSidebarContent));