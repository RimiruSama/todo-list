import React, { ChangeEvent } from 'react';
import ButtonCustom from '../common/ButtonCustom';
import { TextField, Stack } from '@mui/material';

interface Props {
    value: string,
    hanleOnChange(e: ChangeEvent<{ value: string }>) : void,
    handleOnKeyDown(e: React.KeyboardEvent<object>) : void,
    handleOnAdd: React.MouseEventHandler
}

const AddTodoItem: React.FC<Props> = ({value, handleOnAdd, handleOnKeyDown, hanleOnChange}) => {
    return (
        <Stack
            direction='row'
            spacing={0}
            sx={{ width: '100%' }}
        >
            <TextField
                fullWidth
                id="task_name"
                label="Task Name"
                variant="outlined"
                value={value}
                onChange={hanleOnChange}
                onKeyDown={handleOnKeyDown}
            />
            <ButtonCustom
                title='Add'
                styleCss={{ width: '10%' }}
                handleOnclick={handleOnAdd}
            />
        </Stack>
    );
}

export default AddTodoItem;