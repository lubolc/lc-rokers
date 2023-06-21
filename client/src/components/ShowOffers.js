
import React, { Component } from 'react'
import myActions from '../actions/myActions'
import { connect } from 'react-redux'
import OffersFilters from './OffersFilters'
import TableOffers from './tableComponents/TableOffers'
// import Pagination from './tableComponents/Pagination'
import qs from 'querystring'
import Pagination from 'react-js-pagination'


class ShowOffers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterValues: this.getFilters(),
            activePage: 1,
            searchQyery: ''
        }
        this.getSerchingParameters = this.getSerchingParameters.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    getFilters() {
        console.log('get filters')
       
        let search = this.props.location.search
        console.log(search)
        if (search) {
            search = search.substr(1)
            search = qs.parse(search)
            
            return search            
        }
        return null
    }

    componentDidMount () {
        console.log('component did mount !')
        const page = this.props.match.params.page ? this.props.match.params.page : 1
        // let search = this.props.location.search
        // console.log('search')
        // console.log(search)
        // if (search) {
        //     search = search.substr(1)
        //     search = qs.parse(search)
        //     console.log(search);
        //     this.setState({ filterValues: search })
        //     console.log(this.state)
            
        // }
        console.log('filter values')
        console.log(this.state)
        this.props.getData(page, this.props.location.search)
    }

    componentDidUpdate () {
        console.log('componentDidUpdate')
        if (!this.props.state) {
            return
        }
        this.getOffersOnChangePage()
    }

    getOffersOnChangePage () {
        let paramsPage = Number(this.props.match.params.page)
        let statePage = Number(this.props.state.page)

        if (paramsPage !== statePage) {
            this.props.getData(paramsPage, this.props.location.search)
        }
    }

    getSerchingParameters (search) {
        const pathname = '/show-offers/1'
        this.props.history.push({ pathname, search })
        this.props.getData(1, search)
        this.setState({ searchQyery: search })
    }

    handlePageChange (pageNumber) {
        this.setState({ activePage: pageNumber })
        const pathname = '/show-offers/' + pageNumber
        this.props.history.push({ pathname, search: this.state.searchQyery })
    }

    render () {

        if (this.props.state) {
            console.log('render ------------------------')
            console.log(this.state);
            return (
                <div className='row'>
                    <div className='col-md-3'>
                        <h3>Брой на оферти: {this.props.state.countOffers}</h3>
                    </div>
                    <div className='col-md-9'>
                        <OffersFilters
                            selectedValues={this.state.filterValues}
                            getSerchingParameters={this.getSerchingParameters}
                        />
                    </div>
                    <TableOffers offers={this.props.state.offers} />

                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.props.state.countOffers}
                        pageRangeDisplayed={7}
                        onChange={this.handlePageChange}
                    />

                </div>
            )
        }

        return (

            <div className="offerWrapper">
                <h1>Loading ....</h1>
            </div>
        )
    }
}


function mapDispatchToProps (dispatch) {
    return {
        getData: (params, querystring) => {
            dispatch(myActions.getOffers(params, querystring))
        }
    }
}

function mapStateToProps (state) {
    // console.log("mapStateToProps")
    // console.log(state.showOffersReducer)

    return {
        state: state.showOffersReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowOffers)