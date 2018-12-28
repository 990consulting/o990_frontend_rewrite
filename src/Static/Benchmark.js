import React from 'react';
import withDynamicMeta from 'hoc/withDynamicMeta'

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import MaxContainer from 'hoc/MaxContainer';
import ContactForm from 'Common/ContactForm';

import thumbnail1 from 'assets/thumbnail1.png';
import thumbnail2 from 'assets/thumbnail2.png';

const styles = (theme) => ({
  root: {
    ...theme.open990.pageContainer
  },
  image: {
    width: '100%',
  },
  heading: {
    '& h1': {
      fontSize: '2.45rem',
      fontWeight: 700,
      margin: '0 0 1.875rem 0',
      textAlign: 'left',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
      },
    },
    '& h2': {
      lineHeight: 1.5,
      fontWeight: 500,
      fontSize: '1.375rem',
      margin: '0',
      textAlign: 'left',
      alignSelf: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    }
  },
  secondaryHeader: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      content: '""',
      top: '50%',
      borderTop: `5px solid ${theme.color.primary.desaturated}`,
      width: '100%',
      height: '0',
      left: 'auto',
      right: '0',
    },
    '& h3': {
      fontSize: '1.5rem',
      padding: '0 0.9375rem 0 0',
      color: theme.color.black,
      fontWeight: 600,
      lineHeight: 1.5,
      fontFamily: theme.typography.fontFamily.main,
      background: theme.color.background.faded,
      display: 'inline-block',
      position: 'relative',
      margin: 0
    },
    textAlign: 'left',
    margin: '0 0 1.875rem 0'
  },
  secondaryParagraph: {
    margin: '0 0 1.875rem 0',
    lineHeight: '2.1875rem',
    fontSize: '1.1875rem',
    fontWeight: 500,
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  pdfSectionLink: {
    textDecoration: 'none',
    lineHeight: '1.5',
    fontSize: '1rem',
    fontWeight: 400
  },
  bottomText:{
    justifyContent: 'center',
    display: 'flex',
    '& p':{
      margin: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  }
});

const Benchmark = ({
 classes,
}) => {
  return (
    <div className={classes.root}>
      <MaxContainer>
        <Grid 
          container 
          justify="center" 
          spacing={24} 
        >
          <Grid item xs={12} md={7}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={5}>
                <ContactForm
                  subHeaderText={"Discuss your project"}
                  direction={'column'}/>
              </Grid>
              <Grid item xs={12} sm={7} className={classes.heading}>
                <h1>
                  Your organization's financial health over time, compared to the right
                  peers.
                </h1>
                <h2>
                  Custom benchmark reports and analysis for strategy, outreach, and risk assessment.
                </h2>
              </Grid>
              <Grid item md={12}>
                <div className={classes.secondaryHeader}>
                  <h3>Metrics</h3>
                </div>
                <p className={classes.secondaryParagraph}>
                  Customize your report by selecting among dozens of metrics —
                  operating liquidity, fundraising efficiency, compensation spending, and more. We provide a
                  snapshot of your finances using visuals, as well as the underlying data for your further
                  analysis.
                </p>
                <div className={classes.secondaryHeader}>
                  <h3>Comparison groups</h3>
                </div>
                <p className={classes.secondaryParagraph}>
                  Compare your organization to peers chosen on the criteria that
                  matter to you: cause area (NTEE), size, geography, and more. You also have the option of using
                  our cutting-edge Deep Comparables model to develop a peer set uniquely relevant to your
                  organization’s mission and services.
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={3}>
            <Grid container>
              <Grid item xs={12} sm={6} md={12}>
                <a href="https://open990-assets.s3.amazonaws.com/pdf/990Consulting_ReportPreview.pdf">
                  <img
                    className={classes.image}
                    src={thumbnail1}
                    alt="Open990 Benchmark Preview, page 1"/>
                </a>

              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <a
                  href="https://open990-assets.s3.amazonaws.com/pdf/990Consulting_ReportPreview.pdf">
                  <img
                    className={classes.image}
                    src={thumbnail2}
                    alt="Open990 Benchmark Preview, page 2"/>
                </a>
              </Grid>
              <Grid item xs={12}>
                <a
                  className={classes.pdfSectionLink}
                  href="https://open990-assets.s3.amazonaws.com/pdf/990Consulting_ReportPreview.pdf">
                  Download our
                  report preview!
                </a>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.bottomText}>
            <p className={classes.secondaryParagraph}>Benchmark reports start at $900.</p>
          </Grid>
        </Grid>
      </MaxContainer>
    </div>
  )
};

export default withDynamicMeta(withStyles(styles)(Benchmark));
 
