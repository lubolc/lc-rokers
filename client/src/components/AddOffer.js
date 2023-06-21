import React, { Component } from 'react'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
import OfferForm from './OfferForm'


class AddOffer extends Component{
    constructor(props){
        super(props)
        this.createOffer = this.createOffer.bind(this)
    }

    createOffer(offer){
        offer.lastCall = offer.lastCall ? offer.lastCall : new Date()
        offer.nextCall = offer.nextCall ? offer.nextCall : new Date()
        this.props.postForm(offer)
    }

    render() {
        return(
            <OfferForm
                submitForm={this.createOffer}
                {...this.props.addOfferReducer}
            />
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        getDetails:(params)=>{
            dispatch(myActions.getDetails(params))
        },
        changeSelectData:(params)=>{
            dispatch(myActions.chnageSelectDetailsOffer(params))
        },
        postForm:(params)=>{
            dispatch(myActions.postOfferForm(params))
        }
    }
}
function mapStateToProps(state){    
    return{
        addOfferReducer: state.addOfferReducer
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOffer)
