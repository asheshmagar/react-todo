import React from 'react';
import { Box, List, ListItemIcon, ListItem, ListItemText, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const TodoList = ( props ) => {
    return (
        <Box className={ props.styledClass }>
            <List>
                {
                    props.todos ?
                        props.todos.map( ( { id, task } ) => {
                            return (
                                <ListItem key={ id } button>
                                    <ListItemIcon>
                                        <IconButton title={ `Edit task` } onClick={ () => props.editTodo(id) }>
                                            <EditIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText primary={ task } />
                                    <ListItemIcon>
                                        <IconButton title={ `Delete task` } onClick={ () => props.removeTodo(id) }>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                </ListItem>
                            )
                        } )
                        :
                        null
                }
            </List>
        </Box>
    )
}

export default TodoList;