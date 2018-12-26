import React, {Component, Fragment} from 'react';
import NavLink from 'react-router-dom/NavLink';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';

import withViewCheck from 'util/withViewCheck';
import AutosuggestField from 'components/AutosuggestField';

import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import Logo from 'assets/Logo.svg';
import LinkIcon from 'assets/external-link.svg';
import MenuIcon from '@material-ui/icons/Menu';

import { searchOrganizationByQuery, searchPeopleByQuery } from 'api/search';

import { consulting } from 'routes/external';
import {
  contact,
  api,
  benchmark,
  root,
  customData,
  productCatalog,
  resources
} from 'routes/internal';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      color: theme.color.black,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.125rem'
    }
  },
  searchMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '20vw',
    height: '3rem'
  },
  logoMenu: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    '& img': {
      width: '9rem',
      [theme.breakpoints.down('xs')]: {
        width: '7rem',
      },
    },
  },
  menuIcon: {
    color: theme.color.primary.desaturated
  },
  searchIcon: {
    color: theme.color.primary.standard,
    fontSize: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  modifyMenuIcon: {
    width: '15px',
    paddingLeft: '5px'
  },
  bootstrapRoot: {
    width: '19.0625rem',
    [theme.breakpoints.down('md')]: {
      width: '15rem',
    },
    borderRadius: 0,
    backgroundColor: theme.color.white,
    border: `1px solid ${theme.border.color.secondary}`,
    fontSize: '1rem',
    padding: '5px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.border.color.primary,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  icon: {
    display: 'flex',
    justifyContent: 'flex-start',
    '& span': {
      display: 'flex',
      justifyContent: 'center'
    },
    cursor: 'pointer'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    '& a': {
      color: 'black',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.125rem',
      paddingRight: '1rem',

    },
    '& a:last-child': {
      paddingRight: '0',
    }
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      padding: '1rem',
      color: 'black',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.125rem',
      borderTop: '1px solid grey'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  buttonLink: {
    fontSize: '1.125rem',
    textTransform: 'none',
    fontFamily: theme.typography.fontFamily.main,
    paddingLeft: 0,
    '&:hover': {
      backgroundColor: theme.color.white
    }
  },
  simpleLink: {
    paddingRight: '1rem',
    [theme.breakpoints.down('xs')]: {
      '& a': {
        fontSize: '0.9rem',
        padding: 0,
        borderTop: 'none'
      }
    }
  },
  menuItem: {
    paddingTop: '0.3rem',
    paddingBottom: '0.3rem',
    '& a': {
      fontSize: '0.9rem'
    }
  },
  button: {
    padding: 0,
    minWidth: 'auto'
  },
  menuListItem: {
    padding: '4px 16px',
  }
});


class NavigationHeader extends Component {
  anchorListMenuEl = null;
  state = {
    anchorEl: null,
    openMenuList: false,
    isSearchBarActive: false
  };

  onSubmitClick = (event) => {
    if(event){
      event.preventDefault();
    }
    const { searchValue, isOrganizationTab } = this.props;
    const { history } = this.props;

    const searchByQuery = isOrganizationTab ? 
      searchOrganizationByQuery:
      searchPeopleByQuery;

    searchByQuery(searchValue)
      .then(res => res.data)
      .then(url => {
        history.push(url);
      })
  };

  startSearch = () => {
    this.setState({
      isSearchBarActive: true
    })
  };

  endSearch = () => {
    this.setState({
      isSearchBarActive: false
    })
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleListMenuToggle = () => {
    this.setState(state => ({openMenuList: !state.openMenuList}));
  };

  handleListMenuClose = event => {
    if (this.anchorListMenuEl.contains(event.target)) {
      return;
    }

    this.setState({openMenuList: false});
  };

  render() {
    const { 
        classes, 
        isViewXs, 
        isViewSm, 
        location: {pathname},
        isOrganizationSearchMode
    } = this.props;
    const { 
        anchorEl, 
        openMenuList, 
        isSearchBarActive 
    } = this.state;
    const open = Boolean(anchorEl);

    const links = [
      <span className={classes.simpleLink}>
          <NavLink to={root}>Home</NavLink>
      </span>,
      isViewXs && (
        <span className={classes.simpleLink}>
            <NavLink to={customData}>Custom datasets</NavLink>
        </span>
      ),
      isViewXs && (
        <span className={classes.simpleLink}>
            <NavLink to={benchmark}>Benchmark reports</NavLink>
        </span>
      ),
      // isViewXs && (
      //   <span className={classes.simpleLink}>
      //       <NavLink to={api}>APIs</NavLink>
      //   </span>
      // ),
      isViewXs && (
        <span className={classes.simpleLink}>
            <NavLink to={productCatalog}>All products</NavLink>
        </span>
      ),
      !isViewXs ? (
        <span>
          <Button
            buttonRef={node => {
              this.anchorListMenuEl = node;
            }}
            aria-owns={openMenuList ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleListMenuToggle}
            classes={{root: classes.buttonLink}}
            disableTouchRipple={true}
          >
              Products
              <DownIcon className={classes.menuIcon}/>
          </Button>
          <Popper open={openMenuList} anchorEl={this.anchorListMenuEl} transition disablePortal>
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleListMenuClose}>
                    <MenuList>
                      <MenuItem
                        classes={{root: classes.menuItem}}
                        onClick={this.handleListMenuClose}
                      >
                        <NavLink to={customData}>Custom datasets</NavLink>
                      </MenuItem>
                      <MenuItem
                        classes={{root: classes.menuItem}}
                        onClick={this.handleListMenuClose}
                      >
                        <NavLink to={benchmark}>Benchmark reports</NavLink>
                      </MenuItem>
                      {/*<MenuItem*/}
                        {/*classes={{root: classes.menuItem}}*/}
                        {/*onClick={this.handleListMenuClose}*/}
                      {/*>*/}
                        {/*<NavLink to={api}>APIs</NavLink>*/}
                      {/*</MenuItem>*/}
                      <MenuItem
                        classes={{root: classes.menuItem}}
                        onClick={this.handleListMenuClose}
                      >
                        <NavLink to={productCatalog}>All products</NavLink>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </span>
      ) : undefined,
      <span className={classes.simpleLink}>
                <a href={consulting} rel="nofollow">
                    Consulting
                    <img src={LinkIcon} alt="link" className={classes.modifyMenuIcon}/>
                </a>
            </span>,
      <span className={classes.simpleLink}>
                <NavLink to={resources}>Resources</NavLink>
            </span>,
      <span className={classes.simpleLink}>
                <NavLink to={contact}>Contact</NavLink>
            </span>
    ];

    return (
      <Grid container className={classes.root}>
        <Hidden smUp>
          <Grid item xs={isSearchBarActive ? 2 : 3}>
            <MenuIcon
              className={classes.icon}
              aria-label="More"
              aria-owns={open ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              {/* <MoreVertIcon /> */}
            </MenuIcon>
          </Grid>
        </Hidden>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              width: 200,
            },
          }}
        >
          <div className={classes.column}>
            {links.map((link, index) => {
                if (link) {
                  return (
                    <MenuItem
                      classes={{root: classes.menuListItem}}
                      key={`links-${index}`}
                      onClick={this.handleClose}
                    >
                      {link}
                    </MenuItem>
                  )
                } else {
                  return undefined
                }
              }
            )}
          </div>
        </Menu>
        {isViewSm && isSearchBarActive && (
          <Grid item xs={6} sm={3} lg={4} className={classes.logoMenu}>
            <NavLink to={root}>
              <img src={Logo} alt="logo"/>
            </NavLink>
          </Grid>
        ) }
        {!isSearchBarActive ? (
          <Fragment>
            <Grid item xs={6} sm={3} md={2} className={classes.logoMenu}>
              <NavLink to={root}>
                <img src={Logo} alt="logo"/>
              </NavLink>
            </Grid>
            <Hidden only={'xs'}>
              <Grid item sm={8} md={6} className={classes.navMenu}>
                {links}
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid item xs={3} sm={1} md={2} className={classes.searchMenu}>
                <Button onClick={this.startSearch} className={classes.button}>
                  <SearchIcon className={classes.searchIcon}/>
                </Button>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item sm={3} className={classes.searchMenu}>
                <AutosuggestField
                  isOrganizationTab={true}
                  placeholder={'Search...'}
                  additionaClasses={classes.bootstrapRoot}
                  small={true}
                />
              </Grid>
            </Hidden>
          </Fragment>
        ) : (
          <Grid item xs={10} sm={9}>
            <AutosuggestField
              isOrganizationTab={true}
              small={true}
              mobile={true}
              handleOnBlur={this.endSearch}
              placeholder={'Search...'}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
    isOrganizationSearchMode: state.search.isOrganizationSearchMode,
    searchValue: state.search.searchValue 
});

export default withStyles(styles)(withViewCheck()(withRouter(NavigationHeader)));
