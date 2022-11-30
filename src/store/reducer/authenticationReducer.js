import React from 'react'

const update = (state = [], action) => {
    return  state.authenticationStatus = action.payload
}

export {update}