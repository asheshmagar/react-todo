import React from "react";
import {Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Notice = ( props ) => {

    return (
        <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'center' } } open={ props.showNotice } autoHideDuration={3000} onClose={ () => props.noticeClose() }>
            <Alert onClose={ () => props.noticeClose() } severity={ props.noticeType }>{ props.noticeMessage }</Alert>
        </Snackbar>
    )
}

export default Notice;