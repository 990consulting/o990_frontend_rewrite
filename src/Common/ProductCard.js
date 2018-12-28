import React from 'react';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { inquiriesMail } from 'App/routes'

const styles = (theme) => ({
  paper: {
    position: 'relative',
    minHeight: '21rem',
    height: '100%',
    '&>div': {
      height: '100%'
    },
    borderRadius: 0
  },
  header: {
    backgroundColor: theme.color.primary.desaturated,
    fontSize: '1.2rem',
    padding: '0.8rem',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    color: theme.color.white
  },
  headerIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '1.8rem'
  },
  cardContent: {
    lineHeight: 1.5,
    padding: '2.5rem 1.5rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 7rem)'
    }
  },
  buttonWrapper: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    justifyContent: 'center'
  },
  button: {
    height: '100%',
    borderRadius: 0,
    fontSize: '0.8rem',
    textTransform: 'inherit',
    maxWidth: '10rem',
    width: '100%',
    backgroundColor: theme.color.primary.desaturated,
    color: theme.color.white,
    '&:hover': {
      backgroundColor: theme.color.primary.standard
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '8rem',
    },
    '& a': {
      color: theme.color.white,
      textDecoration: 'none'
    }
  },
  action: {
    display: 'flex',
    alignItems: 'flex-end'
  }
});

const ProductCard = ({
    classes,
    history,
    icon,
    title,
    text,
    firstButtonText,
    firstButtonLink,
    firstButton
  }) => {

  const linkTo = (link) => {
    if(!link) return;
    history.push(link);
  };

  const iconElement = (
    <Grid item xs={2} className={classes.headerIcon}>
      {<img src={icon} className={classes.icon} alt={title} />}
    </Grid>
  );

  const titleElement = (
    <Grid item xs={10} className={classes.headerText}>
      {title}
    </Grid>
  );

  const textElement = (
    <span className={classes.bodyText}>
      {text}
    </span>
  );

  const action = (
    <Grid container spacing={firstButton ? 24 : 0} className={classes.buttonWrapper}>
      <Grid item xs={firstButton ? 5 : undefined}>
        {firstButton && (
          <Button
            className={classes.button}
            onClick={() => linkTo(firstButtonLink)}
          >
            {firstButtonText}
          </Button>
        )}
      </Grid>
      <Grid item xs={5}>
        <Button className={classes.button}>
          <a href={inquiriesMail}>
            Contact Us
          </a>
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container className={classes.header}>
            {iconElement}
            {titleElement}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.cardContent}>
          {textElement}
        </Grid>
        <Grid item xs={12} className={classes.action}>
          {action}
        </Grid>
      </Grid>
    </Paper>
  )
};

export default withStyles(styles)(withRouter(ProductCard));