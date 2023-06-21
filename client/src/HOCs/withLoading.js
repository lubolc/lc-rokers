import React, { Component } from 'react'
import {connect} from 'react-redux'

import myActions from '../actions/myActions'

const withLoading = (WrappedComponent) => {
    class ComposedComponent extends Component {
        constructor(props){
            super(props)

            this.state = {
                ready: false,
                data: null
            }
        }

        componentWillReceiveProps(props){
            props.state ? this.setState({ready: true}) : null
        }

        // componentDidUpdate(){
            
        //     console.log("componentDidUpdate !!!!!!")
        //     if(this.state.ready){return}
        //     console.log(this.props)
            
        //     this.props.state ? this.setState({ready: true}) : null
            
        // }

        componentDidMount(){
            this.props.getData(1)
        }

        render(){
            if(this.state.ready){
                return(<WrappedComponent  {...this.props}/>)
            }
            return <h1>Loading ...</h1>
        }
    }

    function mapStateToProps (state){
        return {
            state:state.showOffersReducer
        }
    }

    function mapDispatchToProps(dispatch){
        return{
            getData: (params, querystring)=>{
                dispatch(myActions.getOffers(params, querystring))
            }
        }
    }
    

    return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent)
}

export default withLoading
