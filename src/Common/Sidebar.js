import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withViewCheck from 'hoc/withViewCheck';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

const styles = (theme) => ({
  slider: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 2
  },
  fixed: {
    flex: '1 0 auto',
    height: '100vh',
    '&>div': {
      height: '85%'
    }
  },
  button: {
    color: theme.color.primary.desaturated,
    position: 'absolute',
    top: '30vh',
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'all .2s cubic-bezier(0, 1.26, .8, 1.28)',
    outline: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      left: '-0.8rem',
      top: 'calc(50vh - 73px)'
    },
    '&:hover': {
      cursor: 'pointer',
      outline: 'none'
    },
    '&:active': {
      outline: 'none'
    }
  },
  mobileButton: {
    cursor: 'pointer',
    position: 'fixed',
    right: '0.75rem',
    top: '50vh'
  },
  menu: {
    padding: '1.75rem 1.75rem 1.75rem 0.25rem',
    wordBreak: 'break-word'
  },
  links: {
    textAlign: 'left',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column'
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.color.primary.desaturated
    }
  },
  buttonOpen: {
    justifyContent: 'flex-end',
    display: 'flex'
  },
  buttonClose: {
    display: 'flex',
    justifyContent: 'center'
  },
  hidden: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  header: {
    fontWeight: 700,
    fontSize: '1.2rem',
    padding: '1.75rem 1.75rem 0 1.75rem',
    textAlign: 'center',
  },
  mobileHeader: {
    fontWeight: 700,
    fontSize: '1.2rem',
    padding: '1.75rem',
    textAlign: 'center',
  },
  footer: {
    fontFamily: theme.typography.fontFamily.heading,
    backgroundColor: theme.color.primary.desaturated,
    color: theme.color.white,
    height: '10rem',
    flexShrink: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: 1.41,
    alignItems: 'center',
    display: 'flex',
    padding: '0 1.75rem'
  },
  dialog: {
    wordBreak: 'break-word',
    justifyContent: 'flex-start',
    width: '90%'
  },
  tocList: {
    padding: '1rem 0 0 0'
  },
  tocItem: {
    paddingLeft: '1.5rem'
  },
  tocDot: {}
});

class Sidebar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: props.collapsed
    };
  }

  Transition = (props) => {
    return <Slide direction="right" {...props} />;
  };

  onLinkClick = (href) => {
    if (!href) return;
    const {history} = this.props;
    const {location: {pathname}} = history;
    history.push(`${pathname}#${href}`)
  };

  // When the user clicks on the button, scroll to the top of the document
  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  handleScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const {
      classes,
      titleText,
      footerText,
      toggleCollapse
    } = this.props;
    
    const {isCollapsed} = this.state;
    
    console.log("isCollapsed? " + isCollapsed);
    return (
      <div>
        {
          !isCollapsed && (
            <Grid item xs={12} className={classes.header}>
              <div onClick={() => this.scrollToTop()}>
                {titleText}
              </div>
            </Grid>
          )
        }
        <Grid
          container
          className={classNames('slider', classes.slider)}
          onScroll={this.handleScroll}
        >
          <Hidden smUp>
            {!isCollapsed && (
              <Dialog
                fullScreen
                className={classes.dialog}
                open={!isCollapsed}
                onClose={this.handleClose}
                TransitionComponent={this.Transition}
              >
                <div
                  className={classes.mobileButton}
                  onClick={toggleCollapse}
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    rotation={90}
                  />
                </div>

                <div className={classes.menu}>
                  {
                    !isCollapsed && (
                      <Grid item xs={12} className={classes.mobileHeader}>
                        <div onClick={() => this.scrollToTop()}>
                          {titleText}
                        </div>
                      </Grid>
                    )
                  }
                  <div
                    onClick={() => this.scrollToTop()}
                    className={classNames(classes.tocItem, classes.link)}
                  >
                    TOC goes here
                  </div>
                </div>
              </Dialog>
            )
            }
          </Hidden>
          <Grid item xs={12} className={classes.fixed}>
            <Grid container>
              <Grid item xs={!isCollapsed ? 11 : undefined} className={classes.hidden}>
                {
                  !isCollapsed && (
                    <Grid container className={classes.menu}>
                      <div
                        onClick={() => this.scrollToTop()}
                        className={classNames(classes.tocItem, classes.link)}
                      >
                        TOC goes here
                      </div>
                      <Grid item xs={12} className={classes.links}>
                      </Grid>
                    </Grid>
                  )
                }
              </Grid>
              <Grid item xs={!isCollapsed ? 1 : 12} className={!isCollapsed ? classes.buttonOpen : classes.buttonClose}>
                <div
                  className={classes.button}
                  onClick={toggleCollapse}
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    rotation={90}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          {
            footerText && !isCollapsed && (
              <Grid item xs={12} className={classes.footer}>
                {footerText}
              </Grid>
            )
          }
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(Sidebar)));
