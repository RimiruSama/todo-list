import React, { ChangeEvent, useState, KeyboardEventHandler, useEffect } from 'react';
import TodoItem from './TodoItem';
import { Container, TextField, Stack, Modal, Typography, Box } from '@mui/material';
import ButtonCustom from '../common/ButtonCustom';
import AddTodoItem from './AddTodoItem';
import uuid from 'react-uuid';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewTask, updateTask, deleteTask } from '../../redux/taskList';
import { stringify } from 'querystring';

interface dataTasks {
    index: string,
    value: string,
    status: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TodoList = () => {
    const dispatch = useAppDispatch();

    const [newTask, setNewTask] = useState('');

    const [taskEdit, setTaskEdit] = useState<{id: string, title: string, status:string}>({id: '', title: '', status: ''})

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<object>) => { 
        if(e.key === 'Enter') {
            handleAddTask();
        }
    }

    const handleChangeInput = (e: ChangeEvent<{ value: string }>) => {
        const target = e.target as HTMLTextAreaElement;
        if(target.id === 'task_name') {
            setNewTask(e.currentTarget?.value ?? '');
        } else {
            setTaskEdit(prevState => ({...prevState, title: e.currentTarget?.value ?? ''}));
        }
    }

    const handleAddTask = () => {
        if (!newTask) return;
        const newTaskObj = { status: 'pending', title: newTask, id: uuid() }
        dispatch(addNewTask(newTaskObj));

        setNewTask('');
    }

    const handleDeleteTask = (item: {id: string}) => {
        dispatch(deleteTask(item));
    }


    const handleOpenModalEdit = (item:{id: string, title: string, status: string}) => {
        setOpen(true);
        setTaskEdit(item)
    }

    const handleEditTask = () => {
        dispatch(updateTask(taskEdit))
        setOpen(false);
    }

    const handleCheckComplete = (e:React.ChangeEvent<HTMLInputElement>, item: {id: string, status: string, title: string}) => {
        console.log('item', item);
        const newTaskUpdate = {id: item.id, status: item.status == 'pending' ? 'completed' : 'pending', title: item.title}
        dispatch(updateTask(newTaskUpdate));
    }

    return (
        <Container
            maxWidth='xl'
            sx={{
                padding: '30px 0',
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}
        >

            <AddTodoItem 
                value={newTask}
                handleOnAdd={handleAddTask}
                hanleOnChange={handleChangeInput}
                handleOnKeyDown={handleOnKeyDown}
            />

            <TodoItem
                handleOnDelete={handleDeleteTask}
                handleOnEdit={handleOpenModalEdit}
                handleCheckComplete={handleCheckComplete}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Task
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={0}
                        sx={{ width: '100%', paddingTop: '20px' }}
                    >
                        <TextField
                            fullWidth
                            id="task_name_edit"
                            label="Task Name"
                            variant="outlined"
                            value={taskEdit.title}
                            onChange={handleChangeInput}
                        />
                        <ButtonCustom
                            title='Edit'
                            styleCss={{ width: '10%' }}
                            colorBtn='success'
                            handleOnclick={handleEditTask}
                        />
                    </Stack>
                </Box>
            </Modal>
        </Container>
    );
}

export default TodoList;