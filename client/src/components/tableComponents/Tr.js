import React from 'react'
import { Link } from 'react-router-dom'
import myActions from '../../actions/myActions';


const Tr =(props)=>{
    
    const {
        address, 
        area, 
        constructionTypeId, 
        floor, 
        // info, 
        number, 
        // phoneNumber, 
        // phoneNumbers, 
        price, 
        // propertyOwnerName, 
        propertyTypeId, 
        state,
        // description,
        neighborhoodId,
        _id
    } = props.offer


    return(
        
        <tr>
            <td>{propertyTypeId.value}</td>
            <td>{state.value}</td>
            <td>{constructionTypeId.value}</td>
            <td>{number}</td>
            <td>{neighborhoodId.value}</td>
            <td>{area}</td>
            {/* <td>{phoneNumber}</td> */}
            <td>{price}</td>
            <td>{address}</td>
            <td>{floor}</td>
            {/* <td>{propertyOwnerName}</td> */}
            {/* <td>{description}</td> */}
            {/* <td>{info}</td> */}
            <td><Link to={'/offer-details/'+ _id}>Виж Детайли</Link></td>
            {/* //// repair phone table */}
            {/* <td><button onClick={(_id)=>{ 
                myActions.savePhones(props.offer._id) 
                // console.log(props.offer)
            }} >Запази телефони</button></td> */}
            
            {/* //// repair phone table */}
        </tr>
    )
}

export default Tr