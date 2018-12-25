import React, { Component } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faChevronUp from '@fortawesome/fontawesome-free-solid/faChevronUp';

const styles = (theme) => ({
  root: {
    zIndex: '9999',
    display: 'block',
    position: 'fixed',
    right: '2rem',
    bottom: '1rem',
    '&.hidden': {
      display: 'none'
    }
  },
  icon: {
    color: theme.color.white,
    fontSize: '1rem'
  },
  tooltipButton: {
    backgroundColor: theme.color.primary.standard,
    opacity: 0.5,
    '&:hover': {
      backgroundColor: theme.color.primary.standard,
      opacity: 1
    },
    width: '2.5rem',
    height: '2.5rem',
    minWidth: 0,
    borderRadius: '50%',
  },
  tooltipLabel: {
    fontSize: '0.7rem'
  },
  label: {
    width: 'auto'
  },
  iconWrapper: {},
  // This classNames used for extending default classes declared above from outside components
  extendedIconWrapper: {},
  extendedTooltipButton: {},
});

class ScrollToTopButton extends Component {
  state = {
    isVisible: false
  }

  componentWillMount() {
    window.onscroll = () => this.scrollFunction();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction = () => {
    const isScrolled = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    this.setState({ isVisible: isScrolled });
  }
  
  // When the user clicks on the button, scroll to the top of the document
  scrollToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    const { classes } = this.props;
    const { isVisible } = this.state;

    const icon = (
      <div className={classNames('wrapper', classes.iconWrapper, classes.extendedIconWrapper)}>
        <FontAwesomeIcon
          className={classes.icon}
          icon={faChevronUp}
        />
      </div>
    );

    const tooltip = (
      <Tooltip 
        title={
          <span className={classes.tooltipLabel}>
            Scroll to top
          </span>
        }
        placement="top"
      >
        <Button 
          classes={{
            root: classes.tooltipButton,
            label: classes.label
          }}
          className={classes.extendedTooltipButton}
          onClick={this.scrollToTop}
        >
          {icon}
        </Button>
      </Tooltip>
    );

    return (
      <div className={classNames("ScrollToTopButton", classes.root, {
        hidden: !isVisible
      })}>
        {tooltip}
      </div>
    )
  }
};

export default withStyles(styles)(ScrollToTopButton);