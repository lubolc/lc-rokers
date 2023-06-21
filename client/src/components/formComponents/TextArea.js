import React from 'react'


const TextArea = (props)=>{

    return(
        <div className="form-group">
            <label 
                htmlFor={props.name}>{props.label}</label>
                <textarea 
                    onChange={props.changeFn}
                    value={props.val || ''}
                    type={props.type} 
                    className="form-control" 
                    name={props.name} 
                    id={props.name} 
                    placeholder={props.label}/>
        </div>
    )

}

export default TextArea