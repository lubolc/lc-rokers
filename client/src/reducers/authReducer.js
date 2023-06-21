import types from '../actions/types'
// import {connect} from 'react-redux'


export default function(state = null, action){
    //console.log('AUTH Reducer action:', action)
    switch (action.type) {
        case types.FETCH_USER:
            return action.payload || false // return false if the user is not login
        default:
            return state;
    }
}


