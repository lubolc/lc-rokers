import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {

        case types.GET_OFFER_OPTIONS:
        let data = action.payload

        var { constructionTypes, neighborhoods, propertyTypes, states} = data
        return {
            constructionTypes,
            neighborhoods,
            propertyTypes,
            states
        }

        default: return state

    }

}