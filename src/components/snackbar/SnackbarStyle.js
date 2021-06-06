const SnackbarStyle = theme => {
    return {
        errorColor: {
            backgroundColor: theme.palette.error.dark,
        },
        infoColor: {
            backgroundColor: theme.palette.info.dark,
        },
        primaryColor: {
            backgroundColor: theme.palette.primary.dark,
        },
        secondaryColor: {
            backgroundColor: theme.palette.secondary.dark,
        },
        successColor: {
            backgroundColor: theme.palette.success.dark,
        },
        warningColor: {
            backgroundColor: theme.palette.warning.dark,
        },
        closeIconButton: {
            color: theme.palette.common.white,
        },
    }
}

export default SnackbarStyle;