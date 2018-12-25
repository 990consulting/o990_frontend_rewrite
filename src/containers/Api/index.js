import React from 'react';
import {Helmet} from 'react-helmet';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';

import MaxContainer from 'hoc/MaxContainer';
import IconCard from 'components/IconCard';

import {demoOrg} from 'routes/external'

const styles = (theme) => ({
  root: {
    ...theme.open990.pageContainer,
    wordBreak: 'break-word'
  },
  paper: {
    lineHeight: 1.5,
    [theme.breakpoints.down('sm')]: {
      margin: '1.5rem 0'
    }
  },
  cardText: {},
  cardHeading: {
    color: theme.color.primary.desaturated
  },
  lineHeader: {
    ...theme.open990.pageTitle
  },
  lineText: {
    fontSize: '1.25rem',
    fontWeight: 300,
    lineHeight: 1.8,
    wordBreak: 'break-word'
  },
  iconCardRibbon: {
    paddingTop: '5rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '3.5rem'
    }
  },
  endpointsText: {
    textAlign: 'left',
    fontSize: '1rem',
    '&>div': {
      fontSize: '1.1rem'
    },
    '& li': {
      padding: '0.25rem 0'
    }
  },
  colored: {
    color: theme.color.primary.desaturated
  },
  divider: {
    padding: '2rem 0'
  },
  newLineHeader: {
    '&:before': {
      borderTop: `5px solid ${theme.color.grey.faded}`
    }
  },
  listWrapper: {
    padding: '0 0 1rem 0',
  },
  container: {
    width: '100%'
  },
  link: {
    textDecoration: 'none',
    color: theme.open990.link.color,
    cursor: 'pointer',
    '&:hover': {
      color: theme.color.primary.desaturated
    }
  },
  example: {
    fontSize: '0.98rem!important',
    fontStyle: 'italic',
    fontWeight: 600
  },
  paragraphHeader: {
    fontWeight: 600
  },
  defaultText:{
    marginTop: '10%',
    color: theme.color.black,
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: theme.typography.fontFamily.main,
  }
});

const Api = ({
     classes,
     title,
     description,
     noIndex
   }) => {
  return (
    <div className={classNames("Api", classes.root)}>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={description} />
        { noIndex && <meta name="robots" content='noindex' /> } 
      </Helmet>
      <MaxContainer classes={{container: classes.container}}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} md={10} className={classes.defaultText}>
              <h1>We are currently in the process of updating our API offerings. <br/> Please check back soon!</h1>
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid item xs={12}>*/}
          {/*<Grid container justify="center">*/}
            {/*<Grid item xs={12} md={10} className={classes.lineHeader}>*/}
              {/*<h1>Open990 API</h1>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
          {/*<Grid container justify="center">*/}
            {/*<Grid item xs={12} md={10} className={classes.lineText}>*/}
              {/*<p>*/}
                {/*Open990 offers a customizable RESTful API that facilitates the incorporation of 990 data into your internal system. Through the API, selected variables can be retrieved on demand in .json or .xml. We provide limited customization of the API interface at no additional charge. There is a one-time initiation fee and a monthly maintenance fee. A free, basic API is available to nonprofits, academics, and journalists.*/}
              {/*</p>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
          {/*<Grid container justify="center">*/}
            {/*<Grid item xs={12} md={10} className={classNames(classes.lineHeader, classes.newLineHeader)}>*/}
              {/*<h2>Try our demo APIs!</h2>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12} md={10} className={classes.lineText}>*/}
              {/*<p>You can try our APIs for free at demo.open990.com. No API key is needed. To get started, click*/}
                {/*<a href={demoOrg} className={classes.link}>*/}
                  {/*&nbsp;here&nbsp;*/}
                {/*</a>*/}
                {/*to view the list of 98 searchable organizations. These identifiers can be used as parameters in the*/}
                {/*endpoints. All endpoints return JSON values in non-error cases. APIs are HATEAOS compliant, meaning that*/}
                {/*they provide URLs necessary to repeat the request and/or to navigate to related requests.</p>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
          {/*<Grid container justify="center">*/}
            {/*<Grid item xs={12} md={10} className={classNames(classes.lineHeader, classes.newLineHeader)}>*/}
              {/*<h2>API endpoint classes</h2>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12} md={10} className={classes.lineText}>*/}
              {/*<p>Click below to read more about the several API options you have to unlock the potential of IRS Form 990*/}
                {/*e-file data.</p>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
          {/*<Grid container justify="center">*/}
            {/*<Grid item xs={12} sm={8} md={10} className={classes.iconCardRibbon}>*/}
              {/*<Grid container spacing={24}>*/}
                {/*<Grid item xs={12} md={4}>*/}
                  {/*<IconCard*/}
                    {/*classes={{*/}
                      {/*extendedPaper: classes.paper*/}
                    {/*}}*/}
                    {/*id={'search-endpoints'}*/}
                    {/*icon={faGlobeAmericas}*/}
                    {/*text={*/}
                      {/*<span className={classes.cardText}>*/}
                        {/*<div className={classes.cardHeading}>*/}
                          {/*Search endpoints*/}
                        {/*</div>*/}
                        {/*Query available filings for information of interest.*/}
                      {/*</span>*/}
                    {/*}*/}
                  {/*/>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={4}>*/}
                  {/*<IconCard*/}
                    {/*classes={{*/}
                      {/*extendedPaper: classes.paper*/}
                    {/*}}*/}
                    {/*id={'entity-endpoints'}*/}
                    {/*icon={faBook}*/}
                    {/*text={*/}
                      {/*<span className={classes.cardText}>*/}
                        {/*<div className={classes.cardHeading}>*/}
                          {/*Entity endpoints*/}
                        {/*</div>*/}
                        {/*Provide an overview of available information on a particular organization.*/}
                      {/*</span>*/}
                    {/*}*/}
                  {/*/>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={4}>*/}
                  {/*<IconCard*/}
                    {/*classes={{*/}
                      {/*extendedPaper: classes.paper*/}
                    {/*}}*/}
                    {/*icon={faChartBar}*/}
                    {/*id={'detail-endpoints'}*/}
                    {/*text={*/}
                      {/*<span className={classes.cardText}>*/}
                        {/*<div className={classes.cardHeading}>*/}
                          {/*Detail endpoints*/}
                        {/*</div>*/}
                        {/*Provide a set of data points for a specified tax year and organization.*/}
                      {/*</span>*/}
                    {/*}*/}
                  {/*/>*/}
                {/*</Grid>*/}
              {/*</Grid>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12}>*/}
            {/*<Grid container justify="center">*/}
              {/*<Grid item xs={12} md={10} className={classNames(classes.lineHeader, classes.newLineHeader)}>*/}
                {/*<h2 id="search-endpoints">Search endpoints</h2>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={12} md={10} className={classes.endpointsText}>*/}
                {/*<div className={classes.paragraphHeader}>Simple search API</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/search/<span className={classes.colored}>searchterm</span></i>*/}
                {/*</p>*/}

                {/*<p>Performs a full-text search for organizations relevant to <span className={classes.colored}>searchterm</span>. To be relevant, the organization must have a name similar to <span className={classes.colored}>searchterm</span>. Simple search does not consider personnel names.</p>*/}
                {/*<p>A match is any filing from the organization is considered a match for the organization. Results are sorted by the relevance score of the most relevant filing.</p>*/}

                {/*<div className={classes.example}>Example:</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/search/<span className={classes.colored}>liberties</span></i>*/}
                {/*</p>*/}
                {/*<div className={classes.divider}>*/}
                  {/*<Divider />*/}
                {/*</div>*/}
                {/*<div className={classes.paragraphHeader}>Advanced search API</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/advanced_search?<span className={classes.colored}>option1=value&option2=value...</span></i>*/}
                {/*</p>*/}
                {/*<p>*/}
                  {/*Performs a search using the specified options. A match is any filing from the organization is*/}
                  {/*considered a match for the organization. If a fulltext option is used (e.g. <span*/}
                  {/*className={classes.colored}>org_name</span>), results are*/}
                  {/*sorted by the relevance score of the most relevant filing. Otherwise, sort order is arbitrary. If no*/}
                  {/*parameters are specified, a 400 bad request error occurs.*/}
                {/*</p>*/}
                {/*<div className={classes.example}>Parameters:</div>*/}
                {/*<div className={classes.listWrapper}>*/}
                  {/*<ul>*/}
                    {/*<li><span className={classes.colored}>org_name:</span> Results score higher if their names are*/}
                      {/*similar to <span className={classes.colored}>org_name.</span>*/}
                    {/*</li>*/}
                    {/*<li><span className={classes.colored}>address:</span> Either the organization or one of its*/}
                      {/*facilities must be similar to <span className={classes.colored}>address.</span>*/}
                    {/*</li>*/}
                    {/*<li><span className={classes.colored}>city:</span> Either the organization or one of its facilities*/}
                      {/*must be similar to <span className={classes.colored}>city.</span>*/}
                    {/*</li>*/}
                    {/*<li><span className={classes.colored}>state:</span> 2-digit state code. Either the organization or*/}
                      {/*one of its facilities must have an address in this <span className={classes.colored}>state.</span>*/}
                    {/*</li>*/}
                    {/*<li><span className={classes.colored}>zip:</span> Either the organization or one of its facilities*/}
                      {/*must have this exact ZIP code.*/}
                    {/*</li>*/}
                    {/*<li><span className={classes.colored}>person_name:</span> At least one person reported on this*/}
                      {/*organization’s filings must have a name similar to this one.*/}
                    {/*</li>*/}
                    {/*<li><span className={classes.colored}>ein:</span> The organization must have this exact EIN.</li>*/}
                  {/*</ul>*/}
                {/*</div>*/}

                {/*<div className={classes.example}>Example:</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/advanced_search?<span className={classes.colored}>org_name=consumer+electronics&state=va</span></i>*/}
                {/*</p>*/}
              {/*</Grid>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12}>*/}
            {/*<Grid container justify="center">*/}
              {/*<Grid item xs={12} md={10} className={classNames(classes.lineHeader, classes.newLineHeader)}>*/}
                {/*<h2 id="entity-endpoints">Entity endpoints</h2>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={12} md={10} className={classes.endpointsText}>*/}
                {/*<div className={classes.paragraphHeader}>Simple entity API</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/entity/<span className={classes.colored}>ein</span></i>*/}
                {/*</p>*/}

                {/*<p>Returns all filing details associated with the specified filing. For this demo, this endpoint is*/}
                  {/*reporting a subset of data that 990 Consulting has mapped from the given entity. If the filing does*/}
                  {/*not exist, a 404 not found error occurs.</p>*/}

                {/*<div className={classes.example}>Example:</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/entity/<span className={classes.colored}>411357750</span></i>*/}
                {/*</p>*/}
              {/*</Grid>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12}>*/}
            {/*<Grid container justify="center">*/}
              {/*<Grid item xs={12} md={10} className={classNames(classes.lineHeader, classes.newLineHeader)}>*/}
                {/*<h2 id="detail-endpoints">Detail endpoints</h2>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={12} md={10} className={classes.endpointsText}>*/}
                {/*<div className={classes.paragraphHeader}>The filing detail API</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/filing/<span className={classes.colored}>object_id</span></i>*/}
                {/*</p>*/}

                {/*<p>Returns all filing details associated with the specified filing. For this demo, this endpoint is*/}
                  {/*reporting a subset of data that 990 Consulting has mapped from the given entity. If the filing does*/}
                  {/*not exist, a 404 not found error occurs.</p>*/}

                {/*<div className={classes.example}>Example:</div>*/}
                {/*<p>*/}
                  {/*<i>https://demo.open990.com/filing/<span className={classes.colored}>201412269349301211</span></i>*/}
                {/*</p>*/}
              {/*</Grid>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
        {/*</Grid>*/}
      </MaxContainer>
    </div>
  )
};

export default withStyles(styles)(Api);

