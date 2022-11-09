import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import uuid from 'react-uuid';
import { TaskState } from '../types';

type initialStateType = {
    taskList: TaskState[]
};

const taskList: TaskState[] = JSON.parse(localStorage.getItem('tasks') ?? '');

const initialState: initialStateType = {
    taskList
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addNewTask: (state, action: PayloadAction<TaskState>) => {
            state.taskList.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<TaskState>) => {
            const {payload: {id, title, status}} = action;

            state.taskList = state.taskList.map((task) => task.id === id ? {...task, title, status} : task);
        },
        deleteTask: (state, action: PayloadAction<{id: string}>) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload.id)
        }
    }
});

export const {addNewTask, updateTask, deleteTask} = taskSlice.actions;

export const selectTaskList = (state: RootState) => state.task.taskList;

export default taskSlice.reducer;