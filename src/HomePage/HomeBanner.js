import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaxContainer from 'hoc/MaxContainer';
import withViewCheck from 'hoc/withViewCheck';
import AutosuggestField from 'Common/AutosuggestField';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import HomeBannerTabs from 'HomePage/HomeBannerTabs';
import { styles } from 'HomePage/HomeBannerStyles';

import {
  exampleSearch
} from 'App/routes';

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
                    <HomeBannerTabs activeTab={activeTab} />
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

