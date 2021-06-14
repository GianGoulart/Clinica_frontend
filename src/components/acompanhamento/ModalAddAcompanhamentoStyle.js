const ModalAddAcompanhamentoStyle = (theme) => {
    return {
        field: {
            marginTop: 10,
            marginBottom: 5,
        },
        dialogTitle: {
            paddingBottom: 0
        },
        dialogContent: {
            paddingTop: '0px !important'
        },
        buttonSubmit: {
            minWidth: 97
        },
        inputLabel: {
            [theme.breakpoints.down('xs')]: {
                fontSize: 13
            }
        },
        inputPlaceholder: {
            [theme.breakpoints.down('xs')]: {
                fontSize: 11
            }
        },
        formControl: {
            display: 'flex',
            paddingTop: 7
        }
    };
};

export default ModalAddAcompanhamentoStyle;
