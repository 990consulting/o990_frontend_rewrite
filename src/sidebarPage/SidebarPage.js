import React, { Fragment } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Sidebar from 'sidebarPage/Sidebar';
import { styles } from 'orgProfile/orgProfileStyles'
import withViewCheck from 'hoc/withViewCheck';

class OrganizationProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false
    };
  }
  
  toggleCollapse() {
    const { sidebarCollapsed } = this.state;
    this.setState({
      sidebarCollapsed: !sidebarCollapsed
    });
  }
  
  render() {
    const {
      classes,
      sidebarContent,
      bodyContent
    } = this.props;
    const { sidebarCollapsed } = this.state;
    const toggleCollapse = this.toggleCollapse.bind(this);
    
    return (
      <Fragment>
        <div className={classNames(
          'OrganizationProfilePage',
          classes.root
        )}>
          
          <Grid container>
            {/* Sidebar */}
            <Grid item className={sidebarCollapsed && this.props.isViewMdUp ? classes.sideClose : classes.sideOpen} >
              <Sidebar content={sidebarContent} titleText={"Contents"} collapsed={sidebarCollapsed} toggleCollapse={toggleCollapse} />
            </Grid>
            {/* Body -- adjusts size when sidebar is opened and closed */}
            <Grid
              item
              className={classNames(classes.main,
                sidebarCollapsed || this.props.isViewSmDown ? classes.mainOpen : classes.mainClose
              )}
            >
              {/* Body content */}
              <Grid container>
                {bodyContent}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(withViewCheck()(OrganizationProfile));
