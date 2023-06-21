import { combineReducers } from 'redux'
import authReducer from './authReducer'
import addOfferReducer from './addOfferReducer'
import addOptionsReducer from './addOptionsReducer'
import showOffersReducer from './showOffersReducer'
import getOptionsReducer from './getOptionsReducer'
import offerReducer from './offerReducer'

export default combineReducers({
    auth: authReducer,
    addOfferReducer,
    addOptionsReducer,
    showOffersReducer,
    getOptionsReducer,
    offerReducer
})
