import React, { useEffect } from 'react';
import { Box, Stack, Checkbox, Typography } from '@mui/material';
import ButtonCustom from '../common/ButtonCustom';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface Props {
    handleOnDelete(item: {id: string}): void
    handleOnEdit(item: object): void
    handleCheckComplete(e: React.ChangeEvent<HTMLInputElement>, item: object): void
}

const TodoItem: React.FC<Props> = ({ handleOnDelete, handleOnEdit, handleCheckComplete  }) => {
    const listTask = useAppSelector((state) => state.task.taskList);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(listTask));
    }, [listTask])

    return (
        <>
            {listTask.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '100%',
                        border: '0.5px solid #e3e3e3',
                        padding: '20px'
                    }}
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Stack
                            direction='row'
                            alignItems={'center'}
                        >
                            <Checkbox 
                                color="default" 
                                checked={item.status === 'pending' ? false : true} 
                                onChange={(e) => handleCheckComplete(e, item)}
                            />
                            <Typography 
                                variant="h4"
                                sx={item.status === 'pending' ? {} : {textDecoration: 'line-through'}}
                            >
                                {item.title}
                            </Typography>
                        </Stack>
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <ButtonCustom
                                title='Delete'
                                colorBtn='error'
                                handleOnclick={() => handleOnDelete({id: item.id})}
                            />
                            <ButtonCustom
                                title='Edit'
                                colorBtn='success'
                                handleOnclick={() => handleOnEdit(item)}
                            />
                        </Stack>
                    </Stack>
                </Box>
            ))}
        </>

    );
};

export default TodoItem;