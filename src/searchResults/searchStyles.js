export const styles = theme => ({
  root: {
    ...theme.open990.pageContainer,
    maxWidth: '1440px',
    margin: '0 auto'
  },
  maxContainer: {
    width: '100%'
  },
  mainTitle: {
    ...theme.open990.pageHeader,
    [theme.breakpoints.down('md')]: {
      fontSize: '18px'
    }
  },
  subtitle: {
    fontSize: '18px',
    textAlign: 'left',
    '& span': {
      color: theme.color.primary.faded
    }
  },
  table: {
    border: 'none'
  },
  modifyTable: {
    border: '1px solid rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      border: 'none!important'
    },
  },
  modifyThead: {
    boxShadow: 'none!important',
    backgroundColor: 'rgba(227, 227, 227, 0.7)',
    [theme.breakpoints.down('sm')]: {
      display: 'none!important'
    },
  },
  modifyTr: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'contents!important'
    },
  },
  modifyGroupTr: {
    [theme.breakpoints.down('md')]: {
      border: '1px solid rgba(0,0,0,0.1)'
    },
    '&:hover': {
      background: theme.color.grey.faded,
      cursor: 'pointer'
    }
  },
  modifyTh: {
    '&:focus': {
      outline: 'none !important'
    },
    height: '78px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none'
  },
  modifyTbody: {
    [theme.breakpoints.down('md')]: {
      minWidth: '100%!important'
    }
  },
  modifyTd: {
    '& span': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      '&::before': {
        content: 'attr(data-label)',
        float: 'left',
        textTransform: 'inherit',
        fontWeight: '600',
        fontFamily: 'Lato, san-serif',
        paddingRight: '0,625rem',
        [theme.breakpoints.up('md')]: {
          content: '""',
          display: 'none',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'table-cell',
      textAlign: 'left',
      fontSize: '14px',
      borderBottom: 'none',
      width: '100%!important',
      maxWidth: '100%!important'
    }
  }
});
