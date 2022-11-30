import { createSlice } from '@reduxjs/toolkit'

export const authenticationStatus = createSlice( {
    name: 'authenticationStatus',
    initialState: {
        authenticationStatus: false,
    },
    reducers: {
        update:(status, action) => {
            status.authenticationStatus = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { update } = authenticationStatus.actions

export default authenticationStatus.reducer