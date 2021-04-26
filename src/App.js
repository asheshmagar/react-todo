import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Container, Grid, CssBaseline, makeStyles, Typography, Button } from '@material-ui/core';

import TodoFrom from "./components/todo-form/todo-form.component";
import TodoList from "./components/todo-list/todo-list.component";
import Notice from "./components/notice/notice.component";


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    todoList: {
        width: '100%',
        maxHeight: '450px',
        overflowY: 'scroll'
    }
}));

const getLocalStorage = () => {
    const todoList = localStorage.getItem( 'todoList' );

    if ( todoList ) {
        return JSON.parse( todoList );
    } else {
        return [];
    }
}

const App = () => {
    const [ todo, setTodo ] = useState('');
    const [ todoList, setTodoList ] = useState(getLocalStorage());
    const [ isEditing, setIsEditing ] = useState( false );
    const [ editId, setEditId ] = useState( null );
    const [ snackbarConf, setSnackbarConf ] = useState({ show: false, type: '', message: '' } )
    const classes = useStyles();
    const inputRef = useRef();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if ( ! todo ) {
            showNotice( true, 'error', 'Task field is empty!' );
        } else if ( todo && isEditing ) {
            setTodoList( todoList.map( item => {
                if ( item.id === editId ) {
                    return { ...item, task: todo }
                }
                return item;
            } ) );
            setTodo( '' );
            setEditId( null );
            setIsEditing( false );
            showNotice( true, 'success', 'Successfully updated task!' );
        } else {
            const newTodo = { id: new Date().getTime().toString(), task: todo };
            setTodoList( [...todoList, newTodo ] );
            setTodo('');
            showNotice( true, 'success', 'Successfully added task!' );
        }
    }

    const onChangeHandler = (e) => {
        setTodo(e.target.value);
    }

    const noticeClose = () => {
        showNotice( false, '', '' );
    }

    const clearTodoList = () => {
        setTodoList( [] );
        showNotice( true, 'success', 'Cleared all tasks' );
    }

    const showNotice = ( show=false, type='', message='') => {
        setSnackbarConf( { show, type, message } )
    }

    const removeTodo = ( id ) => {
        showNotice( true, 'warning', `Task with ${id} removed!` );
        setTodoList( todoList.filter( (todo) => todo.id !== id ) );
    }

    const editTodo = ( id ) => {
        const specificTodo = todoList.find( ( todo ) => todo.id === id );
        setIsEditing( true );
        setEditId( id );
        setTodo( specificTodo.task );
        inputRef.current.focus()
    }

    useEffect(() => {
        localStorage.setItem( 'todoList', JSON.stringify( todoList ) )
    }, [todoList]);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Typography component="h1" variant="h2" align='center'>
                A Simple React Todo App!
            </Typography>
            <hr />
            <Grid container spacing={1} direction='row'>
                <Grid container item xs={6}>
                    <TodoFrom styledClasses={ { form: classes.form, submit: classes.submit } } isEditing={ isEditing } todo={ todo } submitForm={ onSubmitHandler } inputChange={ onChangeHandler } inputRef={ inputRef } />
                </Grid>
                <Grid container item xs={6} justify='center'>
                    {
                        todoList.length > 0 &&
                        <Fragment>
                            <TodoList styledClass={ classes.todoList } todos={ todoList } removeTodo={removeTodo} editTodo={editTodo} />
                            <Button variant="contained" color='primary' onClick={ clearTodoList } disabled={ 0 === todoList.length }>Clear</Button>
                        </Fragment>
                    }
                </Grid>
            </Grid>
            <Notice showNotice={ snackbarConf.show } noticeClose={ noticeClose } noticeType={ snackbarConf.type ? snackbarConf.type : 'success' } noticeMessage={ snackbarConf.message } />
        </Container>
    )
}
export default App;