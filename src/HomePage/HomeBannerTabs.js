import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import withViewCheck from 'hoc/withViewCheck';

const styles = (theme) => ({
  tabButton: {
    padding: 0,
    width: '100%',
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily.main,
    textTransform: 'none',
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
    color: theme.color.white,
    height: '40px',
    backgroundColor: theme.color.primary.standard,
    cursor: 'pointer',
    '&.left': {
      borderRadius: '4px 0 0 0',
    },
    '&.right': {
      borderRadius: '0 4px 0 0',
    },
    '&.active, &:hover': {
      backgroundColor: theme.color.primary.faded
    }
  },
});

class HomeBannerTabs extends React.Component {
  buttonContent = [
    {
      "url": "/org",
      "label": "Search Organizations"
    },
    {
      "url": "/people",
      "label": "Search People"
    }
  ];
  
  makeButton(i) {
    const { classes, history, activeTab } = this.props;
    const tabButton = classes.tabButton;
    const left = i === 0;
    const right = i === this.buttonContent.length - 1;
    const active = i === activeTab;
    const content = this.buttonContent[i];
    const className = classNames({tabButton, 'left': left, 'right': right, 'active': active});
    const onClick = () => history.push(content.url);
    return (<Grid item xs={6}>
      <Button className={className} onClick = {onClick}>
        {content.label}
      </Button>
    </Grid>);
  }
  
  makeButtons() {
    const { classes, history, activeTab } = this.props;
    const tabButton = classes.tabButton;
    
    return (
      <Fragment>
        <Grid item xs={6}>
          <Button
            className={classNames(tabButton, 'left', 'active')}
            onClick={() => history.push("/org")}
          >
            {'Search Organizations'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classNames(tabButton, 'right')}
            onClick={() => history.push("/people")}
          >
            {'Search People'}
          </Button>
        </Grid>
      </Fragment>
    );
  }
  
  render() {
    const { classes, history, activeTab } = this.props;
    return (<Fragment>
      {this.makeButtons()}
    </Fragment>);
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(HomeBannerTabs)));
