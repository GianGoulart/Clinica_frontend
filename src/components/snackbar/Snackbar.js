import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    Snackbar as MSnackbar,
    SnackbarContent,
    withStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import SnackbarStyle from './SnackbarStyle';
import AppContext from '../../AppContext';

const COLORS = {
    error: 'error',
    info: 'info',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    warning: 'warning',
}

const Snackbar = ({
    classes,
    color,
    message,
    open,
}) => {
    const { dispatch } = useContext(AppContext);

    const handleClose = () => {
        dispatch({ type: 'HIDE_SNACKBAR' })
    }

    return (
        <MSnackbar
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
            autoHideDuration={4000}
            open={open}
            onClose={handleClose}
        >
            <SnackbarContent
                action={
                    <IconButton
                        className={classes.closeIconButton}
                        size='small'
                        onClick={handleClose}
                    >
                        <Close fontSize='small' />
                    </IconButton>
                }
                className={color ? classes[`${color}Color`] : undefined}
                message={message}
            />
        </MSnackbar>
    );
}

Snackbar.propTypes = {
    color: PropTypes.oneOf(Object.keys(COLORS).map(color => COLORS[color])).isRequired,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
}

Snackbar.defaultProps = {
    color: COLORS.success,
    message: 'Operação realizada com sucesso!',
    open: false,
}

export default withStyles(SnackbarStyle)(Snackbar);
