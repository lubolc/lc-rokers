import React from 'react'

const Select = (props)=>{

    const collection = props.options ? props.options : []

    let defaultOption = (<option value=''>-- избери --</option>)
    if(!props.defaultValue){
        // defaultOption = (<option selected value=''>-- избери --</option>)
        defaultOption = (<option defaultValue='' value=''>-- избери --</option>)
    }

    return(
        <div className="form-group">
            <label htmlFor={props.name}>{ props.label}</label>
            <select 
                name={props.name} 
                onChange={props.changeFn}
                className="form-control form-control-sm">
                {defaultOption}
                {collection.map((e)=>{
                    if(props.defaultValue && props.defaultValue === e._id){
                        return(<option key={e._id} selected={true} value={e._id} >{e.value}</option>)
                    }
                    return (<option key={e._id}  value={e._id} >{e.value}</option>)    
                })}
            </select>
        </div>
    )
}

export default Select
