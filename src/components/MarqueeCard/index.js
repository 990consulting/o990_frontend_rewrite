import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';

const styles = theme => ({
  absentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.color.primary.transparent,
    padding: '1rem',
    marginTop: '1.25rem',
    border: `1px solid ${theme.color.primary.desaturated}`,
    borderRadius: '4px',
    alignItems: 'center',
    '& p': {
      margin: 0,
      color: theme.color.primary.desaturated
    }
  },
  iconWrapper: {
    '& svg': {
      fontSize: '2rem',
      color: theme.color.primary.desaturated
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0.8rem',
      marginRight: 0,
    }
  },
  simpleWrapper: {
    lineHeight: 1.5,
    textAlign: 'left',
    backgroundColor: theme.color.white,
    marginTop: '1.5rem',
    color: theme.color.white,
    boxShadow: '0 2px 4px 0 #e3e3e3',
    '& h4': {
      margin: 0,
      fontSize: '1.125rem',
      padding: '0.78rem 1.8rem',
      backgroundColor: theme.color.primary.desaturated,

    },
    '& p': {
      padding: '1rem 1.8rem',
      margin: 0,
      color: theme.color.black,

    }
  },
  tableWrapper: {
    marginTop: '1.5rem',
    border: `1px solid ${theme.color.primary.desaturated}`,
    textAlign: 'left',
    '& h4': {
      padding: '1rem',
      backgroundColor: theme.color.primary.desaturated,
      color: theme.color.white,
      margin: 0,
      fontSize: '1.125rem',
    },
    '& p': {
      margin: 0,
      padding: '1rem',
      borderBottom: `1px solid ${theme.color.primary.desaturated}`
    },
    '& p:last-child': {
      border: 'none'
    },
    [theme.breakpoints.up('md')]: {
      '&.odd': {
        marginLeft: '1rem'
      },
      '&.even': {
        marginRight: '1rem'
      }
    }
  }
});


const MarqueeCard = ({
  classes,
  marquees
}) => {
  const marqueeSimple = (marquees) => {
    const { label, lines } = marquees[0];
    return (
      <Grid item xs={12} className={classes.simpleWrapper}>
        <h4>{label}</h4>
        {lines.map((line, index) => {
          return (
            <p key={`line-text-${index}`}>
              {line}
            </p>
          )
        })}
      </Grid>
    );
  };

  const marqueeTables = (marquees) => {
    return marquees.map((marquee, index) => {
      const { label, lines } = marquee;
      return (
        <Grid item xs={12} md={6} key={`table-marquee-${index}`}>
          <Grid container justify="center">
            <Grid
              item
              xs={12}
              md={11}
              className={classes.tableWrapper}>
              <h4>
                {label}
              </h4>
              {lines.map((line, index) => {
                return (
                  <p key={`line-text-${index}`}>
                    {line}
                  </p>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  const marqueeAbsent = () => (
    <Grid item xs={12} md={6}>
      <Grid container className={classes.absentWrapper}>
        <Grid item xs={12} sm={1} className={classes.iconWrapper}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </Grid>
        <Grid item xs={12} sm={11}>
          <p>This organization does not file its tax return electronically. 
            <br />
            As a result, we have only basic information on it.
            </p>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderContent = (marquees) => {
    switch (marquees.length) {
      case 0:
        return marqueeAbsent(marquees);
      case 1:
        return marqueeSimple(marquees);
      default:
        return marqueeTables(marquees);
    }
  };

  return (
    <Grid container justify="center">
      {renderContent([...marquees])}
    </Grid>
  )
}
  ;

export default withStyles(styles)(MarqueeCard);