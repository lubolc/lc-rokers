import React, { Component } from 'react'
import OfferForm from './OfferForm'
import myActions from '../actions/myActions'
import { connect } from 'react-redux'

class EditFormOffer extends Component {
    constructor(props){
        super(props)

        this.state={}
        this.submitBtn = this.submitBtn.bind(this)
        this.deleteOffer = this.deleteOffer.bind(this)
    }

    componentWillReceiveProps(props){
        if(props.offer.phoneNumbers){
            const {phoneNumber} = props.offer
            let phoneNumber2 = props.offer.phoneNumbers[1] ? props.offer.phoneNumbers[1] : ''
            let phoneNumber3 = props.offer.phoneNumbers[2] ? props.offer.phoneNumbers[2] : ''
            this.setState( {phoneNumber,phoneNumber2, phoneNumber3} )
        }
    }

    componentDidMount() {
        const paramId = this.props.match.params.id
        this.props.getOffer(paramId)
    }

    setChangetPhones(updatedOffer) {
        let changedPhones = []

        if(updatedOffer.phoneNumber !== this.state.phoneNumber )
            changedPhones.push({from:this.state.phoneNumber, to:updatedOffer.phoneNumber}) 
        if(updatedOffer.phoneNumber2 !== this.state.phoneNumber2)
            changedPhones.push({from:this.state.phoneNumber2, to:updatedOffer.phoneNumber2}) 
        if(updatedOffer.phoneNumber3 !== this.state.phoneNumber3)
            changedPhones.push({from:this.state.phoneNumber3, to:updatedOffer.phoneNumber3})
        
        return changedPhones
    }   

    submitBtn(updatedOffer) {
        
        updatedOffer.changedPhones = this.setChangetPhones(updatedOffer)
        updatedOffer.nextCall = updatedOffer.nextCall ? updatedOffer.nextCall : new Date()
        updatedOffer.lastCall = updatedOffer.lastCall ? updatedOffer.lastCall : new Date()
        this.props.updateOffer(updatedOffer)
    }

    deleteOffer(offer) {
        console.log('deleted offer')
        console.log(offer)
        this.props.deleteOffer(offer._id)
    }

    render() {
        
        if(this.props.offer.state) {

            return (
                <OfferForm 
                    submitForm={this.submitBtn}
                    deleteOffer={this.deleteOffer}
                    {...this.props.offer}
                />
            )
        }else{
            return(<h1>Loading ...</h1>)
        }
    }
}



function mapStateToProps(state){
    return {
        offer: state.offerReducer
    }
}
function mapDispatchToProps(dispatch){
    return {
        updateOffer: (params) => {
            dispatch(myActions.updateOffer(params))
        },
        
        getOffer: (id) => {
            dispatch(myActions.getOffer(id))
        },

        deleteOffer: (id) => {
            dispatch(myActions.deleteOffer(id))
        }
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditFormOffer)