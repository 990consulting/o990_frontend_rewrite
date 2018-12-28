import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withDynamicMeta from 'hoc/withDynamicMeta'
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import MaxContainer from 'hoc/MaxContainer';

import {
  awsPublicDataset,
  searchData
} from 'App/routes';

const styles = (theme) => ({
  root: {
    ...theme.open990.pageContainer,
    textAlign: 'left',
    '& a': {
      ...theme.open990.link,
      textDecoration: 'none'
    }
  },
  lineHeader: {
    ...theme.open990.pageTitle,
    '& h1': {
      padding: '0 1rem 0 0'
    }
  },
  bodyText: {
    lineHeight: 1.8,
    fontSize: '1.17rem',
    textAlign: 'justify'
  },
  textField: {
    width: '95%'
  },
  button: {
    borderRadius: 0,
    textTransform: 'none',
    fontSize: '0.8rem',
    width: '5rem',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    backgroundColor: theme.color.primary.desaturated,
    color: theme.color.white,
    '&:hover': {
      backgroundColor: theme.color.primary.standard
    },
    '&[disabled]': {
      backgroundColor: theme.color.grey.faded
    }
  },
  textGrid: {
    '& h3': {
      textAlign: 'center',
      paddingBottom: '1rem'
    }
  },
  dividerWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  divider: {
    height: '100%',
    width: '2px',
    backgroundColor: theme.border.color.table
  }
});

const formOptions = [
  {
    label: 'Any',
    value: 'Any'
  },
  {
    label: 'Header',
    value: 'Header'
  },
  {
    label: '990',
    value: 'IRS990'
  },
  {
    label: '990PF',
    value: 'IRS990PF'
  },
  {
    label: '990EZ',
    value: 'IRS990EZ'
  },
  {
    label: 'Sched A',
    value: 'IRS990ScheduleA'
  },
  {
    label: 'Sched B',
    value: 'IRS990ScheduleB'
  },
  {
    label: 'Sched C',
    value: 'IRS990ScheduleC'
  },
  {
    label: 'Sched D',
    value: 'IRS990ScheduleD'
  },
  {
    label: 'Sched E',
    value: 'IRS990ScheduleE'
  },
  {
    label: 'Sched F',
    value: 'IRS990ScheduleF'
  },
  {
    label: 'Sched G',
    value: 'IRS990ScheduleG'
  },
  {
    label: 'Sched H',
    value: 'IRS990ScheduleH'
  },
  {
    label: 'Sched I',
    value: 'IRS990ScheduleI'
  },
  {
    label: 'Sched J',
    value: 'IRS990ScheduleJ'
  },
  {
    label: 'Sched K',
    value: 'IRS990ScheduleK'
  },
  {
    label: 'Sched L',
    value: 'IRS990ScheduleL'
  },
  {
    label: 'Sched M',
    value: 'IRS990ScheduleM'
  },
  {
    label: 'Sched N',
    value: 'IRS990ScheduleN'
  },
  {
    label: 'Sched O',
    value: 'IRS990ScheduleO'
  },
  {
    label: 'Sched R',
    value: 'IRS990ScheduleR'
  }
];

class Resources extends Component {
  state = {
    form: formOptions[0].value,
    terms: ''
  };

  setValue = (field) => (event) => {
    const value = event.target.value;
    this.setState({
      //[field]: value.toLowerCase()
      [field]: value
    })
  };

  onSearchSubmit = (event) => {
    event.preventDefault();
    const {history} = this.props;
    const {form, terms} = this.state;
    const url = `${searchData}?${terms && `field=${terms}`}${form && `&form=${form}`}`;
    history.push(url);
  };

  render() {
    const {
      classes,
    } = this.props;

    const {
      terms,
      form
    } = this.state;

    return (
      <div className={classNames(
        'ResourcesPage',
        classes.root
      )}>
        <MaxContainer>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} md={8}>
                <div className={classes.lineHeader}>
                  <h1>Explore 990 variables</h1>
                </div>
                <p className={classes.bodyText}>
                  The Form 990 e-filed data were first made available in 2016 via the <a href={awsPublicDataset}
                                                                                        rel="nofollow">Amazon
                  Web Services Public Dataset program</a> as individual representations of each e-file in XML format. The
                  data files made available here were constructed from those XML files and consist of individual
                  spreadsheets for each of the variables in the data–7,256 in all. They are part of community efforts to
                  make these data more accessible and are available here for free download.
                </p>
              </Grid>
              <Grid item xs={12} md={8}>
                <form onSubmit={this.onSearchSubmit}>
                  <Grid container>
                    <Grid item xs={9}>
                      <TextField
                        label={'Terms'}
                        onChange={this.setValue('terms')}
                        value={terms}
                        classes={{
                          root: classes.textField
                        }}
                        placeholder={'Description or line number'}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label={'Form'}
                        placeholder={'Any'}
                        onChange={this.setValue('form')}
                        value={form}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        select
                        SelectProps={{
                          native: true
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      >
                        {formOptions.map(option => (
                          <option value={option.value} key={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12} md={8}>
                <Button
                  className={classes.button}
                  onClick={this.onSearchSubmit}
                  disabled={!terms}
                >
                  {'Search'}
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <p className={classes.bodyText}>
                  Open990 improves data usability and interpretability beyond this by mapping variables across form
                  types and years.
                </p>
                <div className={classes.lineHeader}>
                  <h1>Additional Free Resources</h1>
                </div>
              </Grid>
              <Grid item xs={12} md={8} className={classes.textGrid}>
                <Grid container spacing={16}>
                  <Grid item xs={5}>
                    <h3>Third-party Tools</h3>
                    <p>
                      <a
                        href="https://projects.propublica.org/nonprofits/"
                        rel="nofollow"
                      >
                        ProPublica’s Nonprofit Explorer
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.opensecrets.org/dark-money/explore-our-reports"
                        rel="nofollow"
                      >
                        OpenSecrets.org’s Nonprofit Data Search
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://nonprofits.sevendaysvt.com"
                        rel="nofollow"
                      >
                        Vermont Nonprofit Navigator
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://docs.opendata.aws/irs-990/readme.html"
                        rel="nofollow"
                      >
                        Machine-readable filings on AWS
                      </a>
                    </p>
                  </Grid>
                  <Grid item xs={2} className={classes.dividerWrapper}>
                    <div className={classes.divider}/>
                  </Grid>
                  <Grid item xs={5}>
                    <h3>IRS Resources</h3>
                    <p>
                      <a
                        href="https://www.irs.gov/pub/irs-prior/f990--2017.pdf"
                        rel="nofollow"
                      >
                        Form 990 (2017)
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.irs.gov/pub/irs-prior/i990--2017.pdf"
                        rel="nofollow"
                      >
                        Instructions Form 990 (2017)
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.irs.gov/pub/irs-prior/f990ez--2017.pdf"
                        rel="nofollow"
                      >
                        Form 990-EZ (2017)
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.irs.gov/pub/irs-prior/i990ez--2017.pdf"
                        rel="nofollow"
                      >
                        Instructions Form 990-EZ (2017)
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.irs.gov/pub/irs-prior/f990pf--2017.pdf"
                        rel="nofollow"
                      >
                        Form 990-PF (2017)
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.irs.gov/pub/irs-prior/i990pf--2017.pdf"
                        rel="nofollow"
                      >
                        Instructions Form 990-PF (2017)
                      </a>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MaxContainer>
      </div>
    )
  }
}


export default withDynamicMeta(withStyles(styles)(withRouter(Resources)));

