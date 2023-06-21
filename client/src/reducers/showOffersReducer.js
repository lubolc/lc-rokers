import types from '../actions/types'


export default function(state = null, action){
   
    switch (action.type) {

        case types.GET_OFFERS:

            let offersInfo = JSON.stringify(action.payload)
            offersInfo = JSON.parse(offersInfo)
            offersInfo.offers = offersInfo.offers.map((e)=>{
                e.floor = e.floor + ' ет.'
                e.price = e.price + ' евро'
                e.area = e.area + ' кв.'
                return e
            })

            return {
                offers: offersInfo.offers, 
                page: offersInfo.page, 
                countOffers: offersInfo.countOffers, 
                offersPerPage:offersInfo.offersPerPage,
                lastPageNbr: offersInfo.lastPageNbr
            }
        
        default:
            return state;
    }
}


