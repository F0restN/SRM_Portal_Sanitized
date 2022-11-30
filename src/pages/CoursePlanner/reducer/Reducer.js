import React from 'react';
import {ACTIONS} from "./ACTIONS";

function Reducer(state, action) {
    switch(action.type){
        case ACTIONS.ADD:
            return [...state, action.payload.item]
        case ACTIONS.UPDATE:
            console.log(action.payload)
            return action.payload
    }
}

export default Reducer;