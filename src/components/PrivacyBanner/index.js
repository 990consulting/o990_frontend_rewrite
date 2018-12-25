import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { closePrivacyBanner } from 'actions/helpers';

import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.color.primary.desaturated,
    opacity: 0.9
  },
  message: {
    fontSize: '0.9rem',
    width: '90%',
    [theme.breakpoints.down('xs')]: {
      width: '85%'
    }
  },
  action: {
    paddingLeft: 0
  }
});

class PositionedSnackbar extends PureComponent {
  state = {
    open: this.props.isOpen || false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { closePrivacyBanner } = this.props;
    this.setState({
      open: false 
    }, () => {
      closePrivacyBanner();
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isPrivacyBannerShown
    })
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
        <Snackbar
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'center' 
          }}
          open={open}
          ContentProps={{
            classes: {
              root: classes.root,
              action: classes.action,
              message: classes.message
            },
            'aria-describedby': 'message-id',
          }}
          message={
            <div id="message-id">
              {'This site uses cookies. By using this site, you agree to our Terms of Service and our Privacy Policy.'}
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.helpers.isPrivacyBannerShown
})

const mapDispatchToProps = (dispatch) => ({
  closePrivacyBanner: () => {
    dispatch(closePrivacyBanner())
  }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PositionedSnackbar));