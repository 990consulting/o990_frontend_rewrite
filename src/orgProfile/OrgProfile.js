import React, { Fragment } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import InfoCard from 'orgProfile/InfoCard';
import MarqueeCard from 'orgProfile/MarqueeCard';
import Sidebar from 'Common/Sidebar';

import withViewCheck from 'hoc/withViewCheck';

const styles = theme => ({
  root: {
    ...theme.open990.pageContainer,
    padding: '0 1.75rem 0 0'
  },
  cardHeader: {
    ...theme.open990.pageHeader
  },
  contactList: {
    justifyContent: 'space-evenly'
  },
  table: {
    paddingTop: '1.5rem',
  },
  paper: {
    wordBreak: 'break-word',
    backgroundColor: theme.color.white,
    boxShadow: `0 2px 4px 0 ${theme.color.background.desaturated}`,
    borderRadius: 0,
    height: '100%',
    maxWidth: 'none',
    margin: 0,
    minWidth: '13rem'
  },
  text: {
    padding: '1rem 1.8rem',
    lineHeight: 1.5,
    '& p': {
      textAlign: 'left',
      display: 'flex',
      margin: 0,
      textTransform: 'inherit'
    }
  },
  sideOpen: {
    width: '25%',
    backgroundColor: theme.color.white,
    transition: 'width 0.5s ease',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0
    },
    '& .slider': {
      width: '24%'
    }
  },
  sideClose: {
    transition: 'width 0.5s ease',
    width: '3%',
    '& .slider':  {
      width: '2%'
    }
  },
  main: {
    padding: '0 0 1.75rem 0'
  },
  mainOpen: {
    transition: 'width 0.5s ease',
    width: '97%'
  },
  mainClose: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
    transition: 'width 0.5s ease',
    width: '75%',
    '&>div': {
      width: '98%',
      marginLeft: '2%'
    },
    [theme.breakpoints.down('lg')]: {
      '& table, & #periods': {
        fontSize: '0.82rem',
        '&>div': {
          padding: '0.8rem 2.38rem'
        }
      }
    }
  },
  loaderWrapper: {
    left: 0,
    top: 0,
    height: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableLoader: {
    paddingTop: '1rem'
  }
});


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
    const { classes } = this.props;
    const { sidebarCollapsed } = this.state;
    const toggleCollapse = this.toggleCollapse.bind(this);
    
    const marquee=[{
      "label": "Headline label",
      "lines": ["Line 1", "Line 2"]
    }];
    return (
      <Fragment>
        <div className={classNames(
          'OrganizationProfilePage',
          classes.root
        )}>
          
          <Grid container>
            <Grid
              item
              className={sidebarCollapsed ? classes.sideClose : classes.sideOpen}
            >
              <Sidebar titleText={"Contents"} collapsed={sidebarCollapsed} toggleCollapse={toggleCollapse} />
            </Grid>
            <Grid
              item
              className={classNames(classes.main,
                sidebarCollapsed ? classes.mainOpen : classes.mainClose
              )}
            >
              <Grid container>
                <Grid item xs={12}>
                  <h3 className={classes.cardHeader}>Org name goes here</h3>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={24} className={classes.contactList}>
                    <Grid key={`info-card-1`} item xs={12} md={4}>
                      <InfoCard
                        classes={{
                          extendedPaper: classes.paper,
                          extendedText: classes.text
                        }}
                        titleText="Card 1"
                        bodyText={["Line 1", "Line 2", "Line 3"]}
                      />
                    </Grid>
                    <Grid key={`info-card-2`} item xs={12} md={4}>
                      <InfoCard
                        classes={{
                          extendedPaper: classes.paper,
                          extendedText: classes.text
                        }}
                        titleText="Card 2"
                        bodyText={["Line 1", "Line 2", "Line 3"]}
                      />
                    </Grid>
                    <Grid key={`info-card-3`} item xs={12} md={4}>
                      <InfoCard
                        classes={{
                          extendedPaper: classes.paper,
                          extendedText: classes.text
                        }}
                        titleText="Card 3"
                        bodyText={["Line 1", "Line 2", "Line 3"]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <MarqueeCard marquees={marquee}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(withViewCheck()(OrganizationProfile));
