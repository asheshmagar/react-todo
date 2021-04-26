import React from "react";
import {Button, Grid, TextField} from "@material-ui/core";


const TodoFrom = ( props ) => {

    return (
        <form className={ props.styledClasses.form } noValidate onSubmit={ (e) => props.submitForm(e) }>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label={ props.isEditing ? `Edit your task` : `Add your task` }
                        onChange={ (e) => props.inputChange(e) }
                        value={ props.todo }
                        inputRef={ props.inputRef }
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={ props.styledClasses.submit }
            >
                {
                    props.isEditing ?
                        `Edit Task`
                        :
                        'Add Task'
                }
            </Button>
        </form>
    )
}

export default TodoFrom;