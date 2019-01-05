/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

export const styles = theme => ({
  root: {
    ...theme.open990.pageContainer,
    padding: '0 1.75rem 0 0'
  },
  cardHeader: {
    ...theme.open990.pageHeader
  },
  contactList: {
    justifyContent: 'space-evenly'
  },
  table: {
    paddingTop: '1.5rem',
  },
  paper: {
    wordBreak: 'break-word',
    backgroundColor: theme.color.white,
    boxShadow: `0 2px 4px 0 ${theme.color.background.desaturated}`,
    borderRadius: 0,
    height: '100%',
    maxWidth: 'none',
    margin: 0,
    minWidth: '13rem'
  },
  text: {
    padding: '1rem 1.8rem',
    lineHeight: 1.5,
    '& p': {
      textAlign: 'left',
      display: 'flex',
      margin: 0,
      textTransform: 'inherit'
    }
  },
  sideOpen: {
    width: '300px',
    backgroundColor: theme.color.white,
    '& .slider': {
      width: '24%'
    }
  },
  sideClose: {
    width: '50px',
    '& .slider':  {
      width: '2%'
    }
  },
  main: {
    padding: '0 0 1.75rem 0'
  },
  mainOpen: {
    width: 'calc(100% - 50px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  mainClose: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
    width: 'calc(100%-300px)',
    '&>div': {
      width: '98%',
      marginLeft: '2%'
    },
    [theme.breakpoints.down('lg')]: {
      '& table, & #periods': {
        fontSize: '0.82rem',
        '&>div': {
          padding: '0.8rem 2.38rem'
        }
      }
    }
  },
  [theme.breakpoints.down('xs')]: {
    width: '100%'
  },
  loaderWrapper: {
    left: 0,
    top: 0,
    height: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableLoader: {
    paddingTop: '1rem'
  }
});
