import React from 'react';
import Select from 'react-select';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const options = [
    {
        value: 'chocolate',
        label: 'Chocolate'
    },
    {
        value: 'strawberry',
        label: 'Strawberry'
    },
    {
        value: 'vanilla',
        label: 'Vanilla'
    }
];

const styles = theme => ({
    bootstrapRoot: {
        borderRadius: 0,
        backgroundColor: theme.color.white,
        border: `1px solid ${theme.border.color.secondary}`,
        fontSize: 16,
        padding: '5px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: theme.border.color.primary,
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    filterBody: {
        padding: '0 10px 0 20px',
        marginRight: '28px',
        '& h4': {
            textAlign: 'left',
            marginBottom: '5px'
        }
    },
    inputWidth: {
        width: '100%'
    },
    zeroPadding: {
        padding: 0
    },
    resetShadow: {
        boxShadow: 'none'
    },
    modifyDisplay: {
        display: 'block'
    },
    expandMoreIconColor: {
        color: theme.color.primary.desaturated
    }
    });

const selectStyles = {
    control: styles => ({ ...styles, height: '44px', borderRadius: 0 }),
    menu: styles => ({ ...styles, position:'relative',borderRadius: 0 })
};
class SearchFilter extends React.Component {
    state = {
        selectedOption: null,
    };

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        });
    };

    render() {
        const { classes } = this.props;
        const { selectedOption } = this.state;

        return (
            <Grid container>
                <Grid item xs={12} className={classes.filterBody}>
                    <ExpansionPanel className={classes.resetShadow}>
                        <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon
                            className={classes.expandMoreIconColor}/>}
                            className={classes.zeroPadding}
                        >
                            <h4>General</h4>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={`${classes.zeroPadding} ${classes.modifyDisplay}`}>
                            <h4>Name</h4>
                            <TextField
                                id="bootstrap-input"
                                InputProps={{
                                    disableUnderline: true,
                                    classes: {
                                        root: classes.bootstrapRoot,
                                    }
                                }}
                                className={classes.inputWidth}
                            />
                            <h4>State</h4>
                            <Select
                                    value={selectedOption}
                                    styles={selectStyles}
                                    onChange={this.handleChange}
                                    options={options}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel className={classes.resetShadow}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={classes.expandMoreIconColor}/>}
                            className={classes.zeroPadding}
                        >
                            <h4>Cause Area</h4>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.zeroPadding}>
                            <TextField
                                placeholder={'Please choose from list'}
                                id="bootstrap-input"
                                InputProps={{
                                    disableUnderline: true,
                                    classes: {
                                        root: classes.bootstrapRoot,
                                    }
                                }}
                                className={classes.inputWidth}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel className={classes.resetShadow}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon
                            className={classes.expandMoreIconColor}/>}
                            className={classes.zeroPadding}
                        >
                            <h4>Size</h4>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.zeroPadding}>
                            <TextField
                                placeholder={'Please choose from list'}
                                id="bootstrap-input"
                                InputProps={{
                                    disableUnderline: true,
                                    classes: {
                                        root: classes.bootstrapRoot,
                                    }
                                }}
                                className={classes.inputWidth}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>

        );
    }
};

export default withStyles(styles)(SearchFilter);