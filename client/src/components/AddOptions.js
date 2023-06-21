import React, { Component } from 'react'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
import Input from './formComponents/Input'


class AddOptions extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            constructionType: '',
            propertyType: '',
            state: '',
            neighborhood: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick  = this.handleClick.bind(this)
    }
   

    handleClick(event) {
        event.preventDefault()
        this.props.postData(this.state)
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    componentWillReceiveProps(nextProps){
        const props = nextProps.addOptionsReducer

        if(props.hasRequest){
            props.success ? this.setState(props.emptyProps) : this.setState({error: 'some error'})
        }
    }

    render(){
        return(
            <form>
                <Input
                    name='constructionType' 
                    label="Вид Строителство" 
                    type='text'
                    val={this.state.constructionType}
                    changeFn={this.handleChange}/>
               
                <Input
                    name='propertyType' 
                    label='Вид Имот' 
                    type='text'
                    val={this.state.propertyType}
                    changeFn={this.handleChange}/>
                
               <Input
                    name='state' 
                    label="Състояние" 
                    type='text'
                    val={this.state.state}
                    changeFn={this.handleChange}/>

                <Input
                    name='neighborhood' 
                    label="Квартал" 
                    type='text'
                    val={this.state.neighborhood}
                    changeFn={this.handleChange}/>


                <button onClick={this.handleClick.bind(this)} className="btn btn-info">Запази</button>
                
            </form>
          )
      }

}

function mapDispatchToProps(dispatch){
    return{
        changeSelectData: (params)=>{
            dispatch(myActions.chnageSelectDetailsOptions(params))
        },
        postData: (params)=>{
            dispatch(myActions.addDetailsPost(params))
        }
    }
}
function mapStateToProps(state){
    return{
        addOptionsReducer: state.addOptionsReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOptions)
