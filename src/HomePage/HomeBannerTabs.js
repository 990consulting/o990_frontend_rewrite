import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import withViewCheck from 'hoc/withViewCheck';

const styles = () => ({});

class HomeBannerTabs extends React.Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(props.classes));
  }
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
    const tabButton = this.props.classes.tabButton;
    const history = this.props.history;
    const left = i === 0;
    const right = i === this.buttonContent.length - 1;
    const content = this.buttonContent[i];
  
    return (<Grid item xs={6}>
      <Button
        className={classNames({tabButton, left: left, right: right})}
        onClick={() => history.push(content.url)}
      >
        {content.label}
      </Button>
    </Grid>);
  }
  
  makeButtons() {
    const ret = [];
    for (let i = 0; i < this.buttonContent.length; i++) {
      const button = this.makeButton(i);
      ret.push(button);
    }
    return ret;
  }
  
  render() {
    return (<Fragment>
      {this.makeButtons()}
    </Fragment>)
  }
}

export default withStyles(styles)(withRouter(HomeBannerTabs));
