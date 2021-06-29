const SnackbarStyle = theme => {
    return {
        errorColor: {
            backgroundColor: "#ba000d",
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
            backgroundColor: "#00a300",
        },
        warningColor: {
            backgroundColor: "#c66900",
        },
        closeIconButton: {
            color: theme.palette.common.white,
        },
    }
}

export default SnackbarStyle;