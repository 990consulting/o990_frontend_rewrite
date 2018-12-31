import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { styles } from 'sidebarPage/sidebarStyles';

class OrgProfileSidebarContent extends React.Component {

  buildTocItem(item) {
    const { classes } = this.props;
    return(
      <div className={classes.tocList} key={`toc-list-${item.card_id}`}>
        <div
          className={classNames(classes.tocItem)}
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
    return(<Grid container className={classes.menu} >
      <h2>Contents</h2>
      {this.buildToc(body)}
    </Grid>)
  }
}

export default withStyles(styles)(OrgProfileSidebarContent);