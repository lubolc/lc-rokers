import React from 'react'
import Tr from './Tr'

export default (props) =>{
    const offers = props.offers.map((e)=>{
        return (<Tr key={e._id} offer={e} />)
    })

    return(<tbody>{offers}</tbody>)
}
