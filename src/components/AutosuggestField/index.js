import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

import { getListOfOrganizationSuggestion, getListOfPeopleSuggestion } from 'api/search';
import { 
  root, 
  search as searchRoute, 
  peopleSearch 
} from 'routes/internal';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    '& div':{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }
  },
  smallSuggestionsContainerOpen: {
    width: '17.5rem',
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    top: '2.7rem',
    right: 0,
    fontSize: '0.9rem',
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
    },
    '& div':{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  bannerSearch: {
    padding: '0 !important'
  },
  bannerTextField: {
    width: '100%'
  },
  smallBannerTextField: {
    width: '17.5rem',
    height: '3rem',
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
      height: '2rem'
    }
  },
  smallContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bannerInputIcon: {
    color: theme.color.primary.standard,
    fontSize: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
    cursor: 'pointer'
  },
  bannerAdvancedSearch: {
    textAlign: 'left',
    padding: '11px 0 10vh !important',
    color: theme.color.white,
    fontSize: '0.875rem',
    textDecoration: 'underline'
  },
  bootstrapRoot: {
    borderRadius: '0 0 4px 4px',
    height: '4rem',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.border.color.secondary}`,
    fontSize: 16,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.border.color.primary,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3rem',
    }
  },
  smallbootstrapRoot: {
    borderRadius: 0,
    height: '4rem',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.border.color.secondary}`,
    fontSize: 16,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.border.color.primary,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('xs')]: {
      height: '2rem',
    }
  }
});

class AutosuggestField extends PureComponent {
  state = {
    value: '',
    suggestions: []
  };

  renderInputComponent = (inputProps) => {
    const {
      classes,
      inputRef = () => {
      },
      ref,
      isOrganizationTab,
      ...other
    } = inputProps;

    const {
      small,
      onSearchClick
    } = this.props;

    const endAdornment = (
      <InputAdornment 
        position="end" 
      >
      <div
        onClick={
          (event) => onSearchClick ? 
          onSearchClick(event): 
          console.log("search clicked")
        }
      >
        <SearchIcon className={classes.bannerInputIcon}/>
      </div>
      </InputAdornment>
    );

    return (
      <TextField
        className={this.props.small ?
          classes.smallBannerTextField :
          classes.bannerTextField
        }
        id="bootstrap-input"
        InputProps={{
          disableUnderline: true,
          endAdornment: endAdornment,
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
            root: small ? classes.smallbootstrapRoot : classes.bootstrapRoot
          },
        }}
        {...other}
      />
    );
  };

  renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{fontWeight: 500}}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{fontWeight: 300}}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  getSuggestionValue = (suggestion) => {
    const {history} = this.props;
    const url = suggestion.url || root;
    history.push(url);
    return suggestion.label;
  };

  handleSuggestionsFetchRequested = ({value}) => {
    const { isOrganizationTab } = this.props;

    const getSuggestion = isOrganizationTab ? 
      getListOfOrganizationSuggestion:
      getListOfPeopleSuggestion;
    const route = isOrganizationTab ?
      searchRoute:
      peopleSearch;
    const slug = isOrganizationTab ? 
      'name_org':
      'name_person';

    getSuggestion(value)
    .then(res => res.data)
    .then(suggestions => {
      this.setState({
        suggestions: [
          ...suggestions,
          {
            label: `See all matches for "${value}"`,
            url: `${route}?${slug}=${value}`
          }
        ]
      });
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, {newValue}) => {
    this.setState({
      value: newValue,
    }, () => {
      if (!this.props.onChangeValue) return;
      this.props.onChangeValue(newValue)
    });
  };

  render() {
    const {
      classes,
      isOrganizationTab,
      placeholder,
      small,
      mobile,
      handleOnBlur
    } = this.props;

    const autosuggestProps = {
      isOrganizationTab,
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
    };

    const placeholderText = placeholder ? placeholder : isOrganizationTab ?
      'Name of organization...' : 'Name of person...';

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            autoFocus: mobile,
            classes,
            placeholder: placeholderText,
            value: this.state.value,
            onChange: this.handleChange(),
            onBlur: handleOnBlur ? () => handleOnBlur() : undefined
          }}
          theme={{
            container: small ? classes.smallContainer : classes.container,
            suggestionsContainerOpen: small ? classes.smallSuggestionsContainerOpen : classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AutosuggestField));