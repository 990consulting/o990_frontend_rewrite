/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';


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

// TODO This is not very DRY.
class UnstyledPanel extends React.Component {
  
  render() {
    const {
      classes,
      panelClasses,
      summaryClasses,
      typographyClasses,
      label,
      children,
      startExpanded
    } = this.props;
    return(<Grid item xs={12}>
      <ExpansionPanel
        CollapseProps = {{ unmountOnExit: true }}
        defaultExpanded = { startExpanded }
        classes={panelClasses}
      >
        <ExpansionPanelSummary
          classes={summaryClasses}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={typographyClasses}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>);
  }
}

const BaseStyledPanel = withStyles(styles)(UnstyledPanel);

class TopLevelPanel extends React.Component {
    render() {
      const {classes, label, startExpanded, children} = this.props;
      
      const panelClasses = {
        expanded: classes.expanded
      };
      
      const summaryClasses = {
        root: classes.summary,
        content: classes.summaryContent
      };
      
      const typographyClasses = {
        root: classes.heading
      };
  
      return <BaseStyledPanel
        panelClasses={panelClasses}
        summaryClasses={summaryClasses}
        typographyClasses={typographyClasses}
        label={label}
        startExpanded={startExpanded}
      >
        {children}
      </BaseStyledPanel>
    }
}

class InteriorPanel extends React.Component {
  render() {
    const {classes, label, startExpanded, children} = this.props;
    
    const panelClasses = {
      expanded: classes.expanded
    };
    
    const summaryClasses = {
      root: classes.summaryRoot,
      content: classes.content
    };
    
    const typographyClasses = {
      root: classes.heading2
    };
  
    return <BaseStyledPanel
      panelClasses={panelClasses}
      summaryClasses={summaryClasses}
      typographyClasses={typographyClasses}
      label={label}
      startExpanded={startExpanded}
    >
      {children}
    </BaseStyledPanel>
  }
}

class LeafPanel extends React.Component {
  render() {
    const {classes, label, children, startExpanded} = this.props;
    
    const panelClasses = {
      expanded: classes.expanded
    };
    
    const summaryClasses = {
      root: classes.summaryRoot,
      content: classes.content
    };
    
    const typographyClasses = {
      root: classes.heading
    };
    
    return <BaseStyledPanel
      panelClasses={panelClasses}
      summaryClasses={summaryClasses}
      typographyClasses={typographyClasses}
      label={label}
      startExpanded={startExpanded}
    >
      {children}
    </BaseStyledPanel>
  }
}

const StyledLeafPanel = withStyles(styles)(LeafPanel);
const StyledInteriorPanel = withStyles(styles)(InteriorPanel);
const StyledTopLevelPanel = withStyles(styles)(TopLevelPanel);

class StyledPanel extends React.Component {
    render() {
      const {displayMode, label, startExpanded, children} = this.props;
      if (displayMode==="always") {
        return (<StyledTopLevelPanel label={label} startExpanded={startExpanded}>
          {children}
        </StyledTopLevelPanel>);
      } else if (displayMode==="expand") {
        return (<StyledInteriorPanel label={label} startExpanded={startExpanded}>
          {children}
        </StyledInteriorPanel>);
      } else if (displayMode==="never") {
        return (<StyledLeafPanel label={label} startExpanded={startExpanded}>
          {children}
        </StyledLeafPanel>);
      } else {
        return <div>Something went wrong</div>;
      }
    }
}

export default withStyles(styles)(StyledPanel);
