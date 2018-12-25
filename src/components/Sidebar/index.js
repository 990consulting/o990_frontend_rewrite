import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { togleSidebar } from 'actions/helpers';
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

  state = {
    isHidden: !this.props.isOpen
  };

  Transition = (props) => {
    return <Slide direction="right" {...props} />;
  };

  toggleMenu = () => {
    const {toggleSidebar} = this.props;
    const {isHidden} = this.state;

    this.setState({
      isHidden: !isHidden
    }, () => {
      const {isHidden: isOpen} = this.state;
      toggleSidebar(!isOpen);
    })
  };

  onLinkClick = (href) => {
    if (!href) return;
    const {history} = this.props;
    const {location: {pathname}} = history;
    history.push(`${pathname}#${href}`)
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isHidden: !nextProps.isOpen
    })
  }

  // When the user clicks on the button, scroll to the top of the document
  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  buildToc = (data) => {
    const { classes } = this.props;
    return data.map((item) => {
      if (item.type === 'nested' && item.toc && item.content) {
        return (
          <div className={classes.tocList} key={`toc-list-${item.card_id}`}>
            <div
              className={classNames(classes.tocItem, classes.link)}
              onClick={() => this.onLinkClick(item.toc)}
            >
              <span className={classes.tocDot}>{item.body}</span>
            </div>
            <div className={classes.tocItem}>
              {this.buildToc(item.content)}
            </div>
          </div>
        )
      } else {
        return (
          <div
            key={`toc-list-empty-item-${item.card_id}`}
            className={classes.emptyToc}
          />
        )
      }
    });
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
      data
    } = this.props;
    const {isHidden} = this.state;

    return (
      <div>
        {
          !isHidden && (
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
            {!isHidden && (
              <Dialog
                fullScreen
                className={classes.dialog}
                open={!isHidden}
                onClose={this.handleClose}
                TransitionComponent={this.Transition}
              >
                <div
                  className={classes.mobileButton}
                  onClick={this.toggleMenu}
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    rotation={90}
                  />
                </div>

                <div className={classes.menu}>
                  {
                    !isHidden && (
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
                    {'Summary'}
                  </div>
                  {this.buildToc(data)}
                </div>
              </Dialog>
            )
            }
          </Hidden>
          <Grid item xs={12} className={classes.fixed}>
            <Grid container>
              <Grid item xs={!isHidden ? 11 : undefined} className={classes.hidden}>
                {
                  !isHidden && (
                    <Grid container className={classes.menu}>
                      <div
                        onClick={() => this.scrollToTop()}
                        className={classNames(classes.tocItem, classes.link)}
                      >
                        {'Summary'}
                      </div>
                      <Grid item xs={12} className={classes.links}>
                        {this.buildToc(data)}
                      </Grid>
                    </Grid>
                  )
                }
              </Grid>
              <Grid item xs={!isHidden ? 1 : 12} className={!isHidden ? classes.buttonOpen : classes.buttonClose}>
                <div
                  className={classes.button}
                  onClick={this.toggleMenu}
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
            footerText && !isHidden && (
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

const mapStateToProps = (state) => ({
  isOpen: state.helpers.isSidebarOpen,
  data: state.organization.data
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: (isOpen) => {
    dispatch(togleSidebar(isOpen));
  }
});

export default withStyles(styles)(withViewCheck()(connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))));