import React, { Component } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import withViewCheck from 'hoc/withViewCheck';

const styles = (theme) => ({
  root: {},
  table: {
  overflowX: 'auto',
  display: 'block'
  },
  expansionDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 0 24px 24px'
  },
  expanded: {
    margin: 0,
    background: `${theme.color.white} !important`
  },
  summaryRoot: {
    '&:hover': {
      background: theme.color.background.desaturated
    }
  },
  summaryIcon: {
    color: theme.color.white
  },
  summary: {
    background: theme.color.primary.desaturated,
    '&:hover': {
      backgroundColor: `${theme.color.primary.desaturated} !important`
    }
  },
  summaryContent: {
    textAlign: 'left',
    fontFamily: theme.typography.fontFamily.heading,
    backgroundColor: theme.color.primary.desaturated,
    fontSize: '1.125rem',
    fontStyle: 'normal',
    '&>p': {
      fontWeight: 'bold',
      color: `${theme.color.white} !important`
    }
  },
  content: {
    textAlign: 'left'
  },
  structureWrapper: {
    boxShadow: '0 2px 4px 0 #e3e3e3',
  },
  tableRow: {
    border: `1px solid ${theme.color.grey.standard}`,
    '& td': {
      borderLeft: `1px solid ${theme.color.grey.standard}`,
    }
  },
  periodsTableRow: {
    backgroundColor: theme.color.background.desaturated,
    border: `1px solid ${theme.color.grey.standard}`,
    '& td': {
      textAlign: 'center',
      borderLeft: `1px solid ${theme.color.grey.standard}`,
    }
  },
  tableCell: {
    textAlign: 'center',
    width: '6rem',
    [theme.breakpoints.up('sm')]: {
      wordBreak: 'break-word'
    }
  },
  tableCellName: {
    textAlign: 'left',
    width: 'auto'
  },
  tbody: {
    display: 'inline-table',
    width: '98%'
  }
});

class OrganizationDetails extends Component {
  buildNestedStructure = (data) => {
    const { 
      classes, 
      isViewMdUp,
      tables
    } = this.props;

    return data.map((item) => {
      if (item.type === 'nested' && item.content) {
        if (item.card === 'never') {
          const isExpanded = isViewMdUp && !!item.toc;
          return (
            <ExpansionPanel 
              id={item.toc || item.card_id} 
              defaultExpanded={isExpanded} 
              elevation={0} 
              key={`${item.card_id}-never`}
              classes={{
                expanded: classes.expanded
              }}
            >
              <ExpansionPanelSummary 
                id={item.card_id} 
                classes={{
                  root: classes.summaryRoot,
                  content: classes.content
                }} 
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>{item.body}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                id={item.card_id} 
                classes={{root: classes.expansionDetails}}
              >
                {this.buildNestedStructure(item.content)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        }

        if (item.card === 'always') {
          const isExpanded = isViewMdUp && !!item.toc;
          return (
            <ExpansionPanel 
              id={item.toc || item.card_id} 
              defaultExpanded={isExpanded} 
              elevation={0} 
              key={`${item.card_id}-always`}
              classes={{
                expanded: classes.expanded
              }}
            >
              <ExpansionPanelSummary 
                id={item.card_id} 
                classes={{
                  root: classes.summary,
                  content: classes.summaryContent
                }} 
                expandIcon={<ExpandMoreIcon classes={{ root: classes.summaryIcon }}/>}
              >
                <Typography className={classes.heading}>{item.body}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails 
                id={item.card_id} 
                classes={{root: classes.expansionDetails}}
              >
                {this.buildNestedStructure(item.content)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        }

        if (item.card === 'expand') {
          const isExpanded = isViewMdUp && !!item.toc;
          return (
            <ExpansionPanel 
              id={item.toc || item.card_id}
              defaultExpanded={isExpanded} 
              elevation={0} 
              key={`${item.card_id}-expand`} 
              classes={{
                expanded: classes.expanded
              }}
            >
              <ExpansionPanelSummary 
                id={item.card_id} 
                classes={{
                  root: classes.summaryRoot,
                  content: classes.content
                }} 
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading2}>{item.body}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails 
                id={item.card_id} 
                classes={{root: classes.expansionDetails}}
              >
                {this.buildNestedStructure(item.content)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        }
      }

      else if (item.type === 'table') {
        let tableData = tables.find((table) => {
          return table.table_id === item.table_id
        });
        return tableData ?
          this.createTable(tableData) :
          <div key={item.table_id} />
      }

      return <div />;
    })
  };

  createTable = (table) => {
    const { classes, periods } = this.props;
    const length = periods.length;
    const rows = table.data.map(item => {
      return {
        id: table.table_id,
        name: item.label,
        data: [...item.data]
      }
    });

    return (
      <Table key={`table-${table.table_id}`} className={classes.table}>
        <TableBody classes={{ root: classes.tbody }}>
          <TableRow 
            classes={{
              root: classes.periodsTableRow
            }}
          >
            <TableCell />
            {periods.map((period) => (
              <TableCell
                className={classes.tableCell}
                key={`cell-${period}`}
                padding="dense" 
              >
                {period !== null ? String(period).slice(0, 4)  : ''}
              </TableCell>
            ))}
          </TableRow>
          {rows.map((row, index) => {
            const {id, name, data} = row;
            return (
              <TableRow 
                key={`row-${id}-${index}`} 
                classes={{
                  root: classes.tableRow
                }}
              >
                <TableCell 
                  className={classes.tableCellName} 
                  padding="dense"
                >
                  {name}
                </TableCell>
                {data.map((cell, index) => (
                  <TableCell
                    className={classes.tableCell} 
                    key={`cell-${id}-${index}`}
                    colSpan={data.length < length ? length : 1} 
                    padding="dense" 
                  >
                    {cell !== null ? String(cell) : ''}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  render() {
    const {
      classes, 
      data, 
      tables, 
    } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.structureWrapper}>
            {tables && this.buildNestedStructure(data, tables)}
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.organization.data,
  tables: state.organization.table
});

export default withStyles(styles)(withViewCheck()(connect(mapStateToProps, null)(OrganizationDetails)));