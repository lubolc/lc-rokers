import axios from 'axios'
import types from './types'
// import { request } from 'http';

export const fetchUser = () =>{
    return function(dispatch){
        axios.get('/api/current_user').then((res)=>{
            return dispatch({
                type:types.FETCH_USER, 
                payload:res.data
            })
        })
    }
    
}
