import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { styles } from "Common/sidebarStyles";
import MobileSidebar from "Common/MobileSidebar";
import DesktopSidebar from "Common/DesktopSidebar";

class Sidebar extends React.Component {

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
          <DesktopSidebar
            scrollToTop={scrollToTop}
            collapsed={collapsed}
            toggleCollapse={toggleCollapse}
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Sidebar));
