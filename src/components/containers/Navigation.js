import React, { Component } from 'react';
import { Link, Switch, Route, IndexRoute  } from 'react-router-dom'
import { connect } from 'react-redux'
import {Home, Dashboard, Details, Login, Cart} from '../containers'

class Navigation extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
	}

	render() {
		const currentUser = this.props.user.currentUser 
		let  qty = 0
		const items = this.props.cart.cartList.map(item => {
			 qty = item.qty + qty
			 return qty
		})

		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <Link className="navbar-brand" to="/">Navbar</Link>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				
				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul className="navbar-nav">
				      <li className="nav-item active">
				        <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
				      </li>
				      <li className="nav-item">
				        { (!currentUser || currentUser.level !=1)   ? null : <Link className="nav-link" to="/dashboard">Dashboard</Link>}
				      </li>
				      <li className="nav-item dropdown">
				        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          Dropdown
				        </a>
				        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
				          <a className="dropdown-item" href="#">Action</a>
				          <a className="dropdown-item" href="#">Another action</a>
				          <div className="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Something else here</a>
				        </div>
				      </li>
					    <li className="nav-item">
					    	<form className="form-inline my-2 my-lg-0">
					    	  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					    	  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					    	</form>
					    </li>
				  	
				  		<li className="nav-item ml-">
 				  			{(currentUser != null) ? <Link className="nav-link" to="/cart">Hello {currentUser.email.split('@')[0]}!</Link> : null }
 				  		</li>
				  		<li className="nav-item ml-3">
				    		<Link className="nav-link" to="/cart">{qty}
				    			{ (currentUser != null) ?
				    				<i className="fas fa-shopping-cart"></i> : <i className="fas fa-shopping-cart "></i> }
				    		</Link>
				    	</li>
				  			
				  	
				 
				    </ul>

				  </div>
				</nav>
				<Switch>
					<Route exact path="/" render={props => <Login {...props} /> } />
					<Route exact path="/home" render={props => <Home {...props} /> } />
					<Route exact path="/dashboard" render={props => <Dashboard {...props} /> } />
					<Route exact path="/cart" render={props => <Cart {...props} /> } />
					<Route exact path="/details" render={props => <Details {...props} /> } />
				</Switch>
			</div>
		)
	}

}

const stateToProps = (state) => {
	return  {
	user: state.user,
	cart: state.cart
	}
}

const dispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(stateToProps, dispatchToProps)(Navigation)