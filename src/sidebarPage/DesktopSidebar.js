import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withViewCheck from 'hoc/withViewCheck';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import {styles} from 'sidebarPage/sidebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

class DesktopSidebar extends React.Component {
  render() {
    const {
      scrollToTop,
      collapsed,
      toggleCollapse,
      classes,
      children
    } = this.props;
    
    return(
      <Grid item xs={12} className={classes.fixed}>
        <Grid container>
          <Grid item xs={!collapsed ? 11 : undefined} className={classes.hidden}>
            {
              !collapsed && (
                <Grid container className={classes.menu}>
                  <div
                    onClick={() => scrollToTop()}
                    className={classNames(classes.tocItem, classes.link)}
                  >
                    {children}
                  </div>
                  <Grid item xs={12} className={classes.links}>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
          <Grid item xs={!collapsed ? 1 : 12} className={!collapsed ? classes.buttonOpen : classes.buttonClose}>
            <div
              className={classes.button}
              onClick={toggleCollapse}
            >
              <FontAwesomeIcon
                icon={faBars}
                rotation={90}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(DesktopSidebar)));
