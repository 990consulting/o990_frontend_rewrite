/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

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

import withViewCheck from 'hoc/withViewCheck';
import AutosuggestField from 'Common/AutosuggestField';

import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import Logo from 'assets/Logo.svg';
import LinkIcon from 'assets/external-link.svg';
import MenuIcon from '@material-ui/icons/Menu';

import { styles } from 'App/NavigationHeaderStyles';
import apiClient from 'App/ApiClient';
import { orgASProps } from "../Common/autosuggestProperties";
import { consulting } from 'App/routes';
import {
  contact,
  benchmark,
  root,
  customData,
  catalog,
  resources
} from 'App/routes';
import Api from "../Static/Api";



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
    const { searchValue } = this.props;
    const { history } = this.props;

    const searchByQuery = apiClient.searchOrganizationByQuery;

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
      isViewXs && (
        <span className={classes.simpleLink}>
            <NavLink to={catalog}>All products</NavLink>
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
                      <MenuItem
                        classes={{root: classes.menuItem}}
                        onClick={this.handleListMenuClose}
                      >
                        <NavLink to={catalog}>All products</NavLink>
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
                  {...orgASProps}
                  additionaClasses={classes.bootstrapRoot}
                  small={true}
                />
              </Grid>
            </Hidden>
          </Fragment>
        ) : (
          <Grid item xs={10} sm={9}>
            <AutosuggestField
              {...orgASProps}
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

export default withStyles(styles)(withViewCheck()(withRouter(NavigationHeader)));
