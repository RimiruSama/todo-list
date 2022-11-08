import React, { ChangeEvent, useState, useEffect, KeyboardEventHandler } from 'react';
import TodoItem from './TodoItem';
import { Container, TextField, Stack, Modal, Typography, Box } from '@mui/material';
import ButtonCustom from '../common/ButtonCustom';
import AddTodoItem from './AddTodoItem';
import uuid from 'react-uuid';

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
    const [newTask, setNewTask] = useState('');
    const [listTask, setListTask] = useState<dataTasks[]>([]);

    const [taskEdit, setTaskEdit] = useState({
        value: '',
        index: '',
        status: 'pending'
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setTaskEdit({value: '', index: '', status: 'pending'})
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
            setTaskEdit(prevState => ({...prevState, value: e.currentTarget?.value ?? ''}));
        }
    }

    const handleAddTask = () => {
        if (!newTask) return;

        const taskLocalStorage = localStorage.getItem('tasks');
        if (taskLocalStorage) {
            const currentTask = JSON.parse(taskLocalStorage);
            currentTask.push({index: uuid(), value: newTask, status: 'pending'});
            localStorage.setItem('tasks', JSON.stringify(currentTask));
            listTask.push({index: uuid(), value: newTask, status: 'pending'});

        } else {
            localStorage.setItem('tasks', JSON.stringify([{index: uuid(), value: newTask, status: 'pending'}]));
            listTask.push({index: uuid(), value: newTask, status: 'pending'});
        }

        setNewTask('');
    }

    const handleDeleteTask = (item: dataTasks, index: number) => {
        let newListTask = listTask.filter((value, num) => {
            return num !== index
        })
        localStorage.setItem('tasks', JSON.stringify(newListTask))
        setListTask(newListTask);
    }


    const handleOpenModalEdit = (item: dataTasks, index: number) => {
        setOpen(true);
        setTaskEdit({value: item.value, index: item.index, status: item.status})
    }

    const handleEditTask = () => {
        let newListTask = listTask.map(item => {
            if(item.index === taskEdit.index) {
                return {...item, value: taskEdit.value};
            }
            return item;
        });
        setListTask(newListTask);
        localStorage.setItem('tasks', JSON.stringify(newListTask));
        setOpen(false);
    }

    const handleCheckComplete = (e:React.ChangeEvent<HTMLInputElement>, item: dataTasks) => {
        let newListTask = listTask.map(data => {
            if(data.index === item.index) {
                return {...data, status: data.status == 'pending' ? 'completed' : 'pending'};
            }
            return data;
        });
        setListTask(newListTask);
        localStorage.setItem('tasks', JSON.stringify(newListTask));
    }


    useEffect(() => {
        const tasks = localStorage.getItem('tasks')
        if (tasks) {
            setListTask(JSON.parse(tasks));
        }
    }, []);

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
                data={listTask}
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
                            value={taskEdit.value}
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