import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withViewCheck from 'hoc/withViewCheck';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import { Transition } from 'Common/SidebarTransition';
import {styles} from 'Common/sidebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

class MobileSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: props.collapsed
    };
  }
  
  render() {
    const {
      scrollToTop,
      isCollapsed,
      toggleCollapse,
      classes
    } = this.props;
    
    return(
      <Hidden smUp>
        {!isCollapsed && (
          <Dialog
            fullScreen
            className={classes.dialog}
            open={!isCollapsed}
            TransitionComponent={Transition}
          >
            <div
              className={classes.mobileButton}
              onClick={toggleCollapse}
            >
              <FontAwesomeIcon
                icon={faBars}
                rotation={90}
              />
            </div>
        
            <div className={classes.menu}>
              {
                !isCollapsed && (
                  <Grid item xs={12} className={classes.mobileHeader}>
                    <div onClick={() => scrollToTop()}>
                      Title goes here
                    </div>
                  </Grid>
                )
              }
              <div
                onClick={() => scrollToTop()}
                className={classNames(classes.tocItem, classes.link)}
              >
                TOC goes here
              </div>
            </div>
          </Dialog>
        )
        }
      </Hidden>
    )
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(MobileSidebar)));
