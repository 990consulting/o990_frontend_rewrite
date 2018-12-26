import React from 'react';

import { searchOrganizationByQuery } from 'api/search';
const styles = theme => ({}); // TODO Is this boilerplate needed?

class OrgHomeBanner extends React.Component {
  render() {
    const searchByQuery = searchOrganizationByQuery;
    const headline = (<h1>Explore profiles on <span>1,808,718</span> nonprofits.</h1>);
  }
}
