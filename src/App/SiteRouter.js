/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomeOrg from 'HomePage/HomeOrg';
import HomePeople from 'HomePage/HomePeople';
import CopyrightPolicy from 'Static/CopyrightPolicy';
import TermsOfService from 'Static/TermsOfService';
import PrivacyPolicy from 'Static/PrivacyPolicy';
import Contact from 'Static/Contact';
import Benchmark from 'Static/Benchmark';
import CustomData from 'Static/CustomData';
import Resources from 'Static/Resources';
import Api from 'Static/Api';
import Catalog from 'Static/Catalog';
import OrgSearchResults from 'searchResults/OrgSearchResults';
import OrgProfile from "../orgProfile/OrgProfile";

import {
  root,
  homeOrg,
  homePeople,
  copyrightPolicy,
  termsOfService,
  privacyPolicy,
  benchmark,
  contact,
  pro,
  customData,
  resources,
  api,
  catalog,
  data,
  orgSearch,
  orgProfile,
  orgProfileExtended
} from 'App/routes';

class SiteRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={homeOrg} exact component={HomeOrg} /> {/* Helmeted */}
        <Route path={homePeople} exact component={HomePeople} /> {/* Helmeted */}
        <Route path={copyrightPolicy} exact component={CopyrightPolicy} /> {/* Helmeted */}
        <Route path={termsOfService} exact component={TermsOfService} /> {/* Helmeted */}
        <Route path={privacyPolicy} exact component={PrivacyPolicy} /> {/* Helmeted */}
        <Route path={contact} exact component={Contact} /> {/* Helmeted */}
        <Route path={benchmark} exact component={Benchmark} /> {/* Helmeted */}
        <Route path={customData} exact component={CustomData} /> {/* Helmeted */}
        <Route path={api} exact component={Api} /> {/* Helmeted */}
        <Route path={resources} exact component={Resources} /> {/* Helmeted */}
        <Route path={catalog} exact component={Catalog} /> {/* Helmeted */}
        <Route path={orgSearch} component={OrgSearchResults} /> {/* Helmeted */}
        <Route path = {orgProfile} component={OrgProfile} />
        <Route path = {orgProfileExtended} component={OrgProfile} />
        
        <Route path={root} exact render={() => ( <Redirect to={homeOrg} /> )} />
        <Route path={data} exact render={() =>( <Redirect to={resources} /> )} />
        <Route path={pro} exact render={() =>( <Redirect to={customData} /> )} />
      </Switch>
    )
  }
}
export default withRouter(SiteRouter);
