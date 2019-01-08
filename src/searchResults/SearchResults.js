/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React, { Fragment} from 'react';
//import SidebarPage from 'sidebarPage/SidebarPage';
import SearchResultsBody from 'searchResults/SearchResultsBody';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from 'searchResults/searchStyles';

class SearchResults extends React.Component {
  render() {
    const { columns, fetchResults, renameRow, handleClick } = this.props;
    /*const sidebarContent = (<Fragment>
      <h2>Search parameters go here</h2>
      <h3>That wasn't so hard</h3>
      <h4>Once the code was written sanely</h4>
    </Fragment>);*/
    const bodyContent = <SearchResultsBody
      columns={columns}
      fetchResults={fetchResults}
      renameRow={renameRow}
      handleClick={handleClick}
    />;
    return bodyContent;
    /*return (<SidebarPage
      sidebarContent={sidebarContent}
      bodyContent={bodyContent}
    />);*/
  }
}

export default withStyles(styles)(withRouter(SearchResults));
