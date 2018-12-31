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

class UnstyledPanel extends React.Component {
  
  startExpanded() {
    console.log(JSON.stringify(Object.keys(this.props)));
    return "toc" in this.props.raw;
  }

  render() {
    const { classes, panelClasses, summaryClasses, typographyClasses } = this.props;
    return(<Grid item xs={12}>
      <ExpansionPanel
        CollapseProps = {{ unmountOnExit: true }}
        defaultExpanded = { this.startExpanded() }
        classes={panelClasses}
      >
        <ExpansionPanelSummary
          classes={summaryClasses}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{this.props.raw.body}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={typographyClasses}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>);
  }
}

const BaseStyledPanel = withStyles(styles)(UnstyledPanel);

class TopLevelPanel extends React.Component {
    render() {
      const {classes, raw} = this.props;
      
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
        raw={raw}
      />
    }
}

class InteriorPanel extends React.Component {
  render() {
    const {classes, raw} = this.props;
    
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
      raw={raw}
    />
  }
}

class LeafPanel extends React.Component {
  render() {
    const {classes, raw} = this.props;
    
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
      raw={raw}
    />
  }
}

const StyledLeafPanel = withStyles(styles)(LeafPanel);
const StyledInteriorPanel = withStyles(styles)(InteriorPanel);
const StyledTopLevelPanel = withStyles(styles)(TopLevelPanel);

class StyledPanel extends React.Component {
    getDisplayMode() {
      return this.props.raw.card;
    }
    
    render() {
      //console.log(JSON.stringify(Object.keys(this.props.raw)));
      const displayMode = this.getDisplayMode();
      //console.log(displayMode);
      if (displayMode==="always") {
        return (<StyledTopLevelPanel raw={this.props.raw} />);
      } else if (displayMode==="expand") {
        return (<StyledInteriorPanel raw={this.props.raw} />);
      } else if (displayMode==="never") {
        return (<StyledLeafPanel raw={this.props.raw} />);
      } else {
        return <div>Something went wrong</div>;
      }
    }
}

export default withStyles(styles)(StyledPanel);
