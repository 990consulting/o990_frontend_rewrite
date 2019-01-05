/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

export const styles = (theme) => ({
  slider: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 2
  },
  fixed: {
    flex: '1 0 auto',
    height: '100vh',
    '&>div': {
      height: '85%'
    }
  },
  button: {
    color: theme.color.primary.desaturated,
    position: 'absolute',
    top: '30vh',
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'all .2s cubic-bezier(0, 1.26, .8, 1.28)',
    outline: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      left: '-0.8rem',
      top: 'calc(50vh - 73px)'
    },
    '&:hover': {
      cursor: 'pointer',
      outline: 'none'
    },
    '&:active': {
      outline: 'none'
    }
  },
  mobileButton: {
    cursor: 'pointer',
    position: 'fixed',
    right: '0.75rem',
    top: '50vh'
  },
  menu: {
    padding: '1.75rem 1.75rem 1.75rem 0.25rem',
    wordBreak: 'break-word'
  },
  links: {
    textAlign: 'left',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column'
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.color.primary.desaturated
    }
  },
  buttonOpen: {
    justifyContent: 'flex-end',
    display: 'flex'
  },
  buttonClose: {
    display: 'flex',
    justifyContent: 'center'
  },
  hidden: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  header: {
    fontWeight: 700,
    fontSize: '1.2rem',
    padding: '1.75rem 1.75rem 0 1.75rem',
    textAlign: 'center',
  },
  mobileHeader: {
    fontWeight: 700,
    fontSize: '1.2rem',
    padding: '1.75rem',
    textAlign: 'center',
  },
  footer: {
    fontFamily: theme.typography.fontFamily.heading,
    backgroundColor: theme.color.primary.desaturated,
    color: theme.color.white,
    height: '10rem',
    flexShrink: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: 1.41,
    alignItems: 'center',
    display: 'flex',
    padding: '0 1.75rem'
  },
  dialog: {
    wordBreak: 'break-word',
    justifyContent: 'flex-start',
    width: '90%'
  },
  tocList: {
    padding: '1rem 0 0 0'
  },
  tocItem: {
    paddingLeft: '20px'
  },
  tocDot: {}
});
