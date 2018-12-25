import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ReactTable from 'react-table';

import Pagination from 'components/Pagination/index';

import {searchDataByQuery, downloadIRSFile} from 'api/search';
import {toggleArrayValue} from 'utils/helpers';

const styles = (theme) => ({
  container: {
    height: '100%'
  },
  root: {
    ...theme.open990.pageContainer,
    maxWidth: '1440px',
    textAlign: 'left',
    margin: '0 auto',
    '& a': {
      ...theme.open990.link,
      textDecoration: 'none'
    }
  },
  lineHeader: {
    ...theme.open990.pageTitle,
    '& h1': {
      padding: '0 1rem 0 0'
    }
  },
  bodyText: {
    lineHeight: 1.8,
    fontSize: '1.17rem',
    textAlign: 'justify'
  },
  textField: {
    width: '50%',
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.color.primary.desaturated
    }
  },
  visibilityButton: {
    backgroundColor: theme.color.primary.standard,
    color: theme.color.white,
    textTransform: 'none',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: theme.color.primary.desaturated
    }
  },
  tableWrapper: {
    paddingTop: '2rem'
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  option: {
    '&:hover': {
      backgroundColor: theme.color.primary.standard,
      color: theme.color.white
    },
    '&.selected': {
      backgroundColor: theme.color.primary.standard,
      color: theme.color.white
    }
  },
  table: {
    border: 'none'
  },
  modifyTable: {
    border: '1px solid rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      border: 'none!important'
    }
  },
  modifyThead: {
    boxShadow: 'none!important',
    backgroundColor: 'rgba(227, 227, 227, 0.7)',
    [theme.breakpoints.down('sm')]: {
      display: 'none!important'
    }
  },
  modifyTr: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'contents!important'
    }
  },
  modifyGroupTr: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px',
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
        textTransform: 'uppercase',
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
  },
  menu: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

const sortOptions = [
  {
    label: 'Relevance',
    value: 'relevance'
  },
  {
    label: 'IRS Path',
    value: 'irs-path'
  },
  {
    label: 'IRS Description',
    value: 'irs-description'
  },
  {
    label: 'Data type',
    value: 'data-type'
  },
  {
    label: 'Form',
    value: 'form'
  },
  {
    label: 'Location',
    value: 'location'
  },
  {
    label: 'Earliest',
    value: 'earliest'
  },
  {
    label: 'Latest',
    value: 'latest'
  }
];


class DataSearchResult extends Component {
  state = {
    filteredData: [],
    visibility: ['irs-path', 'irs-description', 'data-type', 'form', 'location', 'earliest', 'latest'],
    anchorEl: null
  };

  componentWillMount() {
    const {history: {location: {search}}} = this.props;
    searchDataByQuery(search).then(response => {
      const data = response.data.data;
      this.setState({
        data,
        filteredData: data
      });
    });
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  isActive = (value) => {
    const {visibility} = this.state;
    return visibility.indexOf(value) > -1;
  };

  selectOption = (option) => (event) => {
    const {visibility} = this.state;
    this.setState({
      visibility: toggleArrayValue(option, visibility)
    })
  };

  downloadFile = (url) => {
    downloadIRSFile(url).then(res => {
      console.log("url for download", res.data);
      window.open(res.data);
    })
  };

  handleSearch = (event) => {
    const { data } = this.state;
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = data.filter((el) => {
      return searchQuery === el['DT_RowID'].toLowerCase().includes(searchQuery) || el['IRS Path'].toLowerCase().includes(searchQuery) ||
        el['IRS Description'].toLowerCase().includes(searchQuery) || el['Data type'].toLowerCase().includes(searchQuery) ||
        el['Earliest'].toLowerCase().includes(searchQuery) || el['Form'].toLowerCase().includes(searchQuery) ||
        el['Latest'].toLowerCase().includes(searchQuery) || el['Location'].toLowerCase().includes(searchQuery) ||
        el['Relevance'].toLowerCase().includes(searchQuery);
    });

    this.setState({
      filteredData
    });
  };

  render() {
    const {
      classes,
      title,
      description,
      noIndex
    } = this.props;

    const {anchorEl, filteredData} = this.state;

    const columns = [
      {
        id: 'relevance',
        Header: 'Relevance',
        accessor: d => <span data-label='Relevance'>{d['Relevance']}</span>,
        maxWidth: 80,
        minWidth: 60
      },
      {
        id: 'irs-path',
        Header: 'IRS Path',
        accessor: d => <span data-label='IRS Path'>{d['IRS Path']}</span>,
        maxWidth: 500,
        minWidth: 200
      },
      {
        id: 'irs-description',
        Header: 'IRS Description',
        accessor: d => <span data-label='IRS Description'>{d['IRS Description']}</span>,
        maxWidth: 500,
        minWidth: 200
      },
      {
        id: 'data-type',
        Header: 'Data type',
        accessor: d => <span data-label='Data type'>{d['Data type']}</span>,
        maxWidth: 80,
        minWidth: 60
      },
      {
        id: 'form',
        Header: 'Form',
        accessor: d => <span data-label='Form'>{d['Form']}</span>,
        maxWidth: 80,
        minWidth: 80
      },
      {
        id: 'location',
        Header: 'Location',
        accessor: d => <span data-label='Location'>{d['Location']}</span>,
        maxWidth: 120,
        minWidth: 80
      },
      {
        id: 'earliest',
        Header: 'Earliest',
        accessor: d => <span data-label='Earliest'>{d['Earliest']}</span>,
        maxWidth: 80,
        minWidth: 80
      },
      {
        id: 'latest',
        Header: 'Latest',
        accessor: d => <span data-label='Latest'>{d['Latest']}</span>,
        maxWidth: 80,
        minWidth: 80
      }
    ];

    return (
      <div className={classNames("Home", classes.root)}>
        <Helmet defer={false}>
          <title>{title}</title>
          <meta name="description" content={description}/>
          { noIndex && <meta name="robots" content='noindex'/> }
        </Helmet>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <div className={classes.lineHeader}>
                <h1>Search results for form 990 fields</h1>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className={classes.buttonWrapper}>
                  <Button
                    className={classes.visibilityButton}
                    variant="contained"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    Column visibility
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    MenuListProps={{
                      classes: {
                        root: classes.menu
                      }
                    }}
                    onBackdropClick={this.handleClose}
                  >
                    {sortOptions.map(option => (
                      <MenuItem
                        key={option.value}
                        onClick={this.selectOption(option.value)}
                        className={classNames(classes.option, {selected: this.isActive(option.value)})}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item xs={6} className={classes.searchWrapper}>
                  <TextField
                    label={'Search'}
                    onChange={this.handleSearch}
                    classes={{
                      root: classes.textField
                    }}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.tableWrapper}>
              <ReactTable
                defaultPageSize={20}
                minRows={2}
                data={filteredData}
                columns={columns.filter(column => {
                  return this.isActive(column.id);
                })}
                className={`${classes.table} -striped`}
                PaginationComponent={Pagination}
                onPageChange={page => this.setState({page})}
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
                        const link = filteredData[rowInfo.index]['IRS Path'];
                        this.downloadFile(link);
                      }
                    }
                  } else {
                    return {}
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(DataSearchResult);
