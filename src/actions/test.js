import { createAction } from "redux-action"

export const INCREMENT = 'INCREMENT'
export const increment = createAction(INCREMENT)

export const SET_DATA = 'SET_DATA'
export const setData = createAction(SET_DATA)