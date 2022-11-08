import React from 'react';
import { Box, Stack, Checkbox, Typography } from '@mui/material';
import ButtonCustom from '../common/ButtonCustom';

interface dataTasks {
    index: string
    value: string
    status: string
}

interface Props {
    data: dataTasks[]
    handleOnDelete(item: dataTasks, index: number): void
    handleOnEdit(item: dataTasks, index: number): void
    handleCheckComplete(e: React.ChangeEvent<HTMLInputElement>, item: dataTasks): void
}

const TodoItem: React.FC<Props> = ({ data, handleOnDelete, handleOnEdit, handleCheckComplete  }) => {
    return (
        <>
            {data.map((item, index) => (
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
                                {item.value}
                            </Typography>
                        </Stack>
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <ButtonCustom
                                title='Delete'
                                colorBtn='error'
                                handleOnclick={() => handleOnDelete(item, index)}
                            />
                            <ButtonCustom
                                title='Edit'
                                colorBtn='success'
                                handleOnclick={() => handleOnEdit(item, index)}
                            />
                        </Stack>
                    </Stack>
                </Box>
            ))}
        </>

    );
};

export default TodoItem;