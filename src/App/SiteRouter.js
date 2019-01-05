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

import OrgProfile from "../orgProfile/OrgProfile";

class SiteRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={homeOrg} exact component={HomeOrg} />
        <Route path={homePeople} exact component={HomePeople} />
        <Route path={copyrightPolicy} exact render={(props) => (
          <CopyrightPolicy {...props} />
        )} />
        <Route path={termsOfService} exact render={(props) => (
          <TermsOfService {...props} />
        )} />
        <Route path={privacyPolicy} exact render={(props) => (
          <PrivacyPolicy {...props} />
        )} />
        <Route path={contact} exact render={(props) => (
          <Contact {...props} />
        )} />
        <Route path={benchmark} exact render={(props) => (
          <Benchmark {...props} />
        )} />
        <Route path={customData} exact render={(props) => (
          <CustomData {...props} />
        )} />
        <Route path={api} exact render={(props) =>(
          <Api {...props} />
        )} />
        <Route path={resources} exact render={(props) => (
          <Resources {...props} />
        )} />
        <Route path={catalog} exact render={(props) =>(
          <Catalog {...props} />
        )} />
        <Route path={root} exact render={() => (
          <Redirect to={homeOrg} />
        )} />
        <Route path={orgSearch} component={OrgSearchResults} />
        {/* Note: Although listed in the doco, path={[orgProfile, orgProfileExtended]} doesn't work */}
        <Route path = {orgProfile} component={OrgProfile} />
        <Route path = {orgProfileExtended} component={OrgProfile} />
        <Route path={data} exact render={() =>(
          <Redirect to={resources} /> )} />
        <Route path={pro} exact render={() =>(
          <Redirect to={customData} />
        )} />
      </Switch>
    )
  }
}
export default withRouter(SiteRouter);
