import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withViewCheck from 'hoc/withViewCheck';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { Transition } from 'Common/SidebarTransition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import { styles } from "Common/sidebarStyles";
import MobileSidebar from "Common/MobileSidebar";

class Sidebar extends PureComponent {

  constructor(props) {
    super(props);
  }

  // When the user clicks on the button, scroll to the top of the document
  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  handleScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const {
      classes,
      footerText,
      toggleCollapse,
      collapsed
    } = this.props;
    
    const scrollToTop = this.scrollToTop.bind(this);
    console.log("collapsed?" + collapsed);
    return (
      <div>
        <Grid
          container
          className={classNames('slider', classes.slider)}
          onScroll={this.handleScroll}
        >
          <MobileSidebar
            scrollToTop={scrollToTop}
            collapsed={collapsed}
            toggleCollapse={toggleCollapse}
          />
          <Grid item xs={12} className={classes.fixed}>
            <Grid container>
              <Grid item xs={!collapsed ? 11 : undefined} className={classes.hidden}>
                {
                  !collapsed && (
                    <Grid container className={classes.menu}>
                      <div
                        onClick={() => this.scrollToTop()}
                        className={classNames(classes.tocItem, classes.link)}
                      >
                        {"" + collapsed}
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
          {
            footerText && !collapsed && (
              <Grid item xs={12} className={classes.footer}>
                {footerText}
              </Grid>
            )
          }
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(Sidebar)));
