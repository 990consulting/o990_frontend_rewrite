import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';


import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Pagination from 'components/Pagination/index';

import { searchOrganizationsWithParams } from 'api/search';

const styles = theme => ({
  root: {
    ...theme.open990.pageContainer,
    maxWidth: '1440px',
    margin: '0 auto'
  },
  maxContainer: {
    width: '100%'
  },
  mainTitle: {
    ...theme.open990.pageHeader,
    [theme.breakpoints.down('md')]: {
      fontSize: '18px'
    }
  },
  subtitle: {
    fontSize: '18px',
    textAlign: 'left',
    '& span': {
      color: theme.color.primary.faded
    }
  },
  table: {
    border: 'none'
  },
  modifyTable: {
    border: '1px solid rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      border: 'none!important'
    },
  },
  modifyThead: {
    boxShadow: 'none!important',
    backgroundColor: 'rgba(227, 227, 227, 0.7)',
    [theme.breakpoints.down('sm')]: {
      display: 'none!important'
    },
  },
  modifyTr: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'contents!important'
    },
  },
  modifyGroupTr: {
    [theme.breakpoints.down('md')]: {
      border: '1px solid rgba(0,0,0,0.1)'
    },
    '&:hover': {
      background: theme.color.grey.faded,
      cursor: 'pointer'
    }
  },
  modifyTh: {
    '&:focus': {
      outline: 'none !important'
    },
    height: '78px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none'
  },
  modifyTbody: {
    [theme.breakpoints.down('md')]: {
      minWidth: '100%!important'
    }
  },
  modifyTd: {
    '& span': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      '&::before': {
        content: 'attr(data-label)',
        float: 'left',
        textTransform: 'inherit',
        fontWeight: '600',
        fontFamily: 'Lato, san-serif',
        paddingRight: '0,625rem',
        [theme.breakpoints.up('md')]: {
          content: '""',
          display: 'none',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'table-cell',
      textAlign: 'left',
      fontSize: '14px',
      borderBottom: 'none',
      width: '100%!important',
      maxWidth: '100%!important'
    }
  }
});

class Search extends Component {
  state = {
    page: 0,
    caption: '',
    matches: [],
    params: undefined
  };

  getDataBasedOnSearchSlug() {
    const { history:{location:{search}} } = this.props;
    searchOrganizationsWithParams(search).then(response => {
    const data = response.data;
    this.setState({
        caption: data.caption,
        matches: data.matches,
        params: data.params
      })
    })
  }

  componentWillMount() {
    this.getDataBasedOnSearchSlug();
  }

  componentWillReceiveProps() {
    this.getDataBasedOnSearchSlug();
  }

  render() {
    const {
      classes,
      title,
      description,
      noIndex,
      history
    } = this.props;
    const { caption, matches } = this.state;

    const data = matches ?
      matches.map(dataItem => {
        return {
          name: dataItem['Name'],
          ein: dataItem['EIN'],
          city: dataItem['City'],
          state: dataItem['State'],
          totalAssets: dataItem['Total assets'],
        }
      }) : [];

    const columns = [
      {
        id: 'name',
        Header: 'Name',
        accessor: d => <span data-label='Name'>{d.name}</span>,
        maxWidth: 777,
        minWidth: 400
      },
      {
        id: 'ein',
        Header: 'EIN',
        accessor: d => <span data-label='EIN'>{d.ein}</span>,
        maxWidth: 150,
        minWidth: 100
      },
      {
        id: 'city',
        Header: 'City',
        accessor: d => <span data-label='City'>{d.city}</span>,
        maxWidth: 230,
        minWidth: 100
      },
      {
        id: 'state',
        Header: 'State',
        accessor: d => <span data-label='State'>{d.state}</span>,
        maxWidth: 130,
        minWidth: 50

      },
      {
        id: 'total-assets',
        Header: 'Total assets',
        accessor: d => <span data-label='Total assets'>{d.totalAssets}</span>,
        maxWidth: 150,
        minWidth: 100
      }
    ];
    console.log('matches', matches.length >= 20 ? 20 : (matches.length ? matches.length : 2))
    return (
      <div className="SearchPage">
        <Grid container className={classes.root}>
            <Helmet defer={false}>
              <title>{title}</title>
              <meta name="description" content={description} />
              { noIndex && <meta name="robots" content='noindex' /> }
            </Helmet>
            <Grid item xs={12}>
              <h3 className={classes.mainTitle}>Nonprofit organization search</h3>
              <p className={classes.subtitle}>
                {caption}
              </p>
            </Grid>
            <Grid item xs={12}>
              <ReactTable
                defaultPageSize={20}
                minRows={2}
                data={data}
                columns={columns}
                className={`${classes.table} -striped`}
                PaginationComponent={Pagination}
                onPageChange={page => this.setState({page})}
                // noDataText={'Specify your search parameters in the form on the left.'}
                getTrProps={() => {
                  return {
                    className: classes.modifyTr
                  };
                }}
                getTheadProps={() => {
                  return {
                    className: classes.modifyThead
                  };
                }}
                getTheadThProps={() => {
                  return {
                    className: classes.modifyTh
                  };
                }}
                getTableProps={() => {
                  return {
                    className: classes.modifyTable
                  };
                }}
                getTbodyProps={() => {
                  return {
                    className: classes.modifyTbody
                  };
                }}
                getTdProps={() => {
                  return {
                    className: classes.modifyTd
                  };
                }}
                getTrGroupProps={(state, rowInfo) => {
                  if (rowInfo && rowInfo.row) {
                    return {
                      className: classes.modifyGroupTr,
                      onClick: () => {
                        const ein = matches[rowInfo.index]['EIN'];
                        history.push(`/org/${ein}`)
                      }
                    }
                  }else{
                    return {}
                  }
                }}
              />
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Search));