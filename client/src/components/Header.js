import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Header extends Component{

  renderContent(){
    switch (this.props.auth){
      case null:
        return 'Pending ...'
      case false:
        return <ul className="nav navbar-nav navbar-right">
        <li><a href="/auth/google"><span className="glyphicon glyphicon-user"></span>Sing Up</a></li>
        </ul>
        
      default:
        return <ul className="nav navbar-nav navbar-right">
                <li><a ><span className="glyphicon glyphicon-user"></span>{this.props.auth.displayName}</a></li>
                <li><a href="/api/logout"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
              </ul>
    }
  }

    render(){
      // console.log('Header state: ')
      // console.log(this.props.state)

      // let userName = this.props.auth ? this.props.auth.displayName : 'Sing Up'
        return(
           <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link 
                  className="navbar-brand" 
                  to={this.props.auth ? '/' : '/'}
                >LC Brokers</Link>
              </div>
              <ul className="nav navbar-nav">
              {/* className="active" */}
              
                <li><Link to='/add-details'>Добави опции</Link></li>
                <li><Link to='/add-offer'>Добави оферта</Link></li>
                <li><Link to='/show-offers/1'>Оферти</Link></li>
              </ul>
              {this.renderContent()}
            </div>
          </nav>
        )
    }
}

function mapStateToProps(state){
  // console.log('state in header: ')
  // console.log(state)
  return {
    auth: state.auth
   }
}

export default connect(mapStateToProps)(Header)
