import types from '../actions/types'
// import myActions from '../actions/myActions'

function getPhoneNumbers(phoneNumbers){
    return{
        phoneNumber2 : phoneNumbers[1] ? phoneNumbers[1] : '',
        phoneNumber3 : phoneNumbers[2] ? phoneNumbers[2] : ''
    }
}  
function getDropdowsDefaultValues(offer){
    const {neighborhoodId, constructionTypeId, propertyTypeId, state} = offer
    return {
        dropdownsValues: {neighborhoodId, constructionTypeId, propertyTypeId, state}
    }
}
export default (state = {}, action) => {
    
    switch (action.type) {

        case types.GET_OFFER:
            return {
                ...action.payload,
                ...getDropdowsDefaultValues(action.payload), 
                ...getPhoneNumbers(action.payload.phoneNumbers)
            }


        default: return state

    }

}