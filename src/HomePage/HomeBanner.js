import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaxContainer from 'hoc/MaxContainer';
import withViewCheck from 'hoc/withViewCheck';
import AutosuggestField from 'Common/AutosuggestField';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import HomeBannerTabs from 'HomePage/HomeBannerTabs';
import {
  exampleSearch,
  organization,
  people
} from 'App/routes';

const styles = theme => ({
  banner: {
    backgroundColor: theme.color.primary.desaturated,
    '& h1': {
      minHeight: '4.75rem',
      margin: 0,
      padding: '13vh 1rem 0rem',
      color: theme.color.white,
      fontSize: '2.25rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
      },
      '& span': {
        color: theme.color.secondary,
        fontSize: '3.8rem',
        [theme.breakpoints.down('xs')]: {
          fontSize: '3.38rem',
        }
      }
    }
  },
  bannerContainer: {
    justifyContent: 'center'
  },
  modifyContainer: {
    marginTop: '3.4375rem'
  },
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
  bannerSearch: {
    padding: '0 !important'
  },
  bannerTextField: {
    width: '100%'
  },
  bannerInputIcon: {
    color: theme.color.primary.standard,
    fontSize: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
  },
  bannerAdvancedSearch: {
    textAlign: 'left',
    '& a': {
      color: theme.color.white,
      fontSize: '0.875rem',
      textDecoration: 'underline',
      
    },
    '&:last-child': {
      padding: '11px 0 10vh !important',
      color: theme.color.white,
      fontSize: '0.875rem',
    },
  },
  bootstrapRoot: {
    borderRadius: '0 0 4px 4px',
    height: '4rem',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.border.color.secondary}`,
    fontSize: 16,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.border.color.primary,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3rem',
    }
  }
});

class HomeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }
  
  submit() {
    // TODO Derived components must supply searchByQuery, headline, buttons
    const {history, searchByQuery} = this.props;
    const {searchValue} = this.state;
    
    searchByQuery(searchValue)
    .then(res => res.data)
    .then(url => {
      history.push(url);
    });
  }
  
  onSearchChange = (query) => {
    this.setState({
        searchValue: query
    });
  };
  
  onSubmitclick = (event) => {
    event.preventDefault();
    this.submit();
  };
  
  render() {
    const {classes, activeTab, asProps} = this.props;
    
    const einLink = (
      <Link to={exampleSearch}>
        13-5562162
      </Link>
    );
    
    const nameLink = (
      <Link to={exampleSearch}>
        Helen Keller International
      </Link>
    );
    
    return (
      <Grid item xs={12}>
        <div className={classes.banner}>
          <MaxContainer>
            {this.props.headline}
            <form onSubmit={this.onSubmitClick}>
              <Grid container className={classes.bannerContainer}>
                <Grid item xs={10} md={6}>
                  <Grid container className={classNames(classes.bannerContainer, classes.modifyContainer)}>
                    <HomeBannerTabs  />
                    <Grid item xs={12} className={classes.bannerSearch}>
                      <AutosuggestField
                        onSearchClick={this.onSubmitClick}
                        onChangeValue={this.onSearchChange}
                        {...asProps}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.bannerAdvancedSearch}>
                      Example: {nameLink}, {einLink}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </MaxContainer>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(withViewCheck()(withRouter(HomeBanner)));

