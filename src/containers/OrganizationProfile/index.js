import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import OrganizationDetails from 'components/OrganizationDetails';
import InfoCard from 'components/InfoCard';
import MarqueeCard from 'components/MarqueeCard';
import Sidebar from 'components/Sidebar';
import ScrollToTopButton from 'components/ScrollToTopButton';
import { scrollTo } from 'utils/helpers';

import withViewCheck from 'hoc/withViewCheck';

import { notFound } from 'routes/internal';
import Loader from 'react-loader-spinner'

import {
  getOrganizationUrlById,
  getOrganizationInfoById,
  getTableDataById
} from 'api/organization';
import { saveOrganizationData, saveTable } from 'actions/organization';

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


class OrganizationProfile extends PureComponent {
  state = {
    name: '',
    vitals: [],
    marquee: [],
    isTablesFetching: true,
    isFetching: true
  };

  getAllTableData = (data) => {
    data.forEach(item => {
      if (item.type === 'nested' && item.content) {
        this.getAllTableData(item.content);
      } else if (item.type === 'table') {
        getTableDataById(item.table_id).then(res => {
          const { saveTable, tables } = this.props;
          const table_id = item.table_id;

          const table = tables.find(point => {
            return point.table_id === table_id
          });
          if(!table) {
            saveTable({
              ...res.data,
              table_id
            });
          }
        });
      }
    });
  };

  getDataById(props) {
    const {
      history,
      match: {params: {ein}},
      location: {pathname},
      saveData
    } = props;

    this.setState({
      isFetching: true
    });

    getOrganizationUrlById(ein).then(res => {
      const url = res.data;
      if (pathname !== url) {
        history.push(url, {code: 301})
      }

      getOrganizationInfoById(ein).then(res => {
        const {
          header: {
            vitals,
            name,
            marquee
          },
          body,
          periods
        } = res.data;

        saveData(body);
        this.getAllTableData(body);

        this.setState({
          vitals,
          name,
          marquee,
          periods
        }, () => {
          this.setState({
            isFetching: false
          });
        })
      })
    }).catch(error => {
      console.log("Page is temporarily unavailable", error);
      history.replace(notFound);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.getDataById(nextProps);
      scrollTo(nextProps)
    }
  }

  componentDidMount() {
    this.getDataById(this.props);
    scrollTo(this.props);
  }

  render() {
    const {
      vitals,
      marquee,
      name,
      isFetching,
      periods
    } = this.state;
    const {
      classes,
      title,
      description,
      noIndex,
      isSidebarOpen
    } = this.props;

    return (
      <Fragment>
        <Helmet defer={false}>
          <title>{title}</title>
          <meta name="description" content={description} />
          { noIndex && <meta name="robots" content='noindex' /> }
         </Helmet>
        {
          isFetching ? (
            <div className={classes.loaderWrapper}>
              <Loader
                type='ThreeDots'
                color='#6839d3'
                height='75'
                width='75'
              />
            </div>
          ) :
          <div className={classNames(
            'OrganizationProfilePage',
            classes.root
          )}>

            <Grid container>
              <Grid
                item
                className={isSidebarOpen ? classes.sideOpen : classes.sideClose}
              >
                <Sidebar
                  titleText={"Contents"}
                  // footerText={"Explore professional services from Open 990"}
                />
              </Grid>
              <Grid
                item
                className={classNames(classes.main,
                  isSidebarOpen ? classes.mainClose : classes.mainOpen
                )}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <h3 className={classes.cardHeader}>{name}</h3>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={24} className={classes.contactList}>
                      {!isFetching && vitals.map((vital, index) => {
                          return (
                            <Grid key={`info-card-${index}`} item xs={12} md={4}>
                              <InfoCard
                                classes={{
                                  extendedPaper: classes.paper,
                                  extendedText: classes.text
                                }}
                                titleText={vital.label}
                                bodyText={[...vital.lines]}
                              />
                            </Grid>
                          )
                        }
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <MarqueeCard marquees={marquee}/>
                  </Grid>
                  <Grid item xs={12} className={classes.table}>
                    <OrganizationDetails
                      periods={periods}
                    />
                  </Grid>
                  <Hidden smDown>
                    <ScrollToTopButton />
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </div>
        }
    </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isSidebarOpen: state.helpers.isSidebarOpen,
  tables: state.organization.table
});

const mapDispatchToProps = (dispatch) => ({
  saveData: (data) => {
    dispatch(saveOrganizationData(data))
  },
  saveTable: (table) => {
    dispatch(saveTable(table))
  }
});

export default withStyles(styles)(withViewCheck()(connect(mapStateToProps, mapDispatchToProps)(OrganizationProfile)));