import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from './formComponents/Select'
import actions  from '../actions/myActions'
import Dropdowns from './formComponents/Dropdowns'
import qs from 'querystring'    
import DatePickerSelector from './formComponents/DatePickerSelector'
import Input from './formComponents/Input'
import moment from 'moment'


class OffersFilter extends Component {
    constructor(props){
        super(props)

        const values = this.props.selectedValues 
        console.log(values)
        if(values){
            const { constructionTypeId, propertyTypeId, neighborhoodId, state} = values
            this.state = { constructionTypeId, propertyTypeId, neighborhoodId, state}
            console.log('state OfferFilter -----')
            console.log(this.state);
        }else{
            this.state = {
                constructionTypeId:'',
                propertyTypeId: '',
                state: '',
                neighborhoodId: '',
                countOffers: 10,
                nextCall: moment(),
                phoneNumber: ''
            }
        }
        this.changeHandlerDatePicker = this.changeHandlerDatePicker.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
    }

    changeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    changeHandlerDatePicker(date){
        this.setState({'nextCall': date})
    }

    componentDidMount(){
        this.props.getOptions()            
    }

    clickBtn(e){
        e.preventDefault()

        if(e.target.name === 'search') {
            console.log(this.state)
            let { constructionTypeId, propertyTypeId, neighborhoodId, state, countOffers, nextCall, phoneNumber } = this.state
            nextCall = moment(this.state.nextCall).format('YYYY-MM-DD')
            const search = qs.stringify({constructionTypeId, propertyTypeId, neighborhoodId, state, countOffers, nextCall, phoneNumber})
            this.props.getSerchingParameters(search)
        }else{
            this.props.getSerchingParameters(false)
            this.setState({
                constructionTypeId:'',
                propertyTypeId: '',
                state: '',
                neighborhoodId: '',
                countOffers: 10,
                nextCall: moment()
            })
        }
    }


    render() {
        let btnStyle = {
            borderRadius: '5%',
            width: '100%',
            margin: '3px'
        }
        return(
        <section>
            <div className='row'>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <Dropdowns 
                                defaultValues={this.state} 
                                changeHandler={this.changeHandler}
                            />
                        </div>
                    </div>    
                    <div className='row'>
                        <div className='col-md-2'>
                            <Select 
                                label='Покажи'
                                options={[{value: 10, _id:10},{value:15, _id:15}]} 
                                defaultValue={10}/>
                        </div>
                        <div className='col-md-3'>
                            <DatePickerSelector 
                                label='Следващо обаждане'
                                changeFn={this.changeHandlerDatePicker} 
                                startDate={this.state.nextCall}/>
                        </div>        
                        <div className='col-md-3'>
                            <Input 
                                label='Телефон' 
                                changeFn={this.changeHandler}
                                val={this.state.phoneNumber}
                                name='phoneNumber'    
                            />
                        </div>
                    </div>    
                </div>
                <div>
                    <div className='col-md-2 '>
                        <button 
                        // style={btnStyle}
                        name='search' 
                        onClick={this.clickBtn} 
                        className='border-radius-1 width-100 button btn-background-2'>Търси</button>
                        <button style={btnStyle}
                        name='clear' 
                        onClick={this.clickBtn} 
                        className='border-radius-1 width-100 button btn-background-5'>Изчисти</button>
                    </div>  
                </div>
            </div>
            
            
            
                        
            
        </section>
        )
    }

}




function mapDispatchToProps(dispatch){
    return{
        getOptions : ()=> dispatch(actions.getDetails()),
        getData: (params)=>{ dispatch(actions.getOffers(params)) }
    }
}

export default connect(()=>{return {}},mapDispatchToProps)(OffersFilter)
