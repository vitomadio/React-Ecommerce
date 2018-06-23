import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CartActions } from '../../actions';
import { FlashMessage } from '../layouts'
import { Link } from 'react-router-dom'

class Cart extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: '',
			messageClass: '',
			total: 0
		}
	}

	componentDidMount(){
		const userId = this.props.user.currentUser._id
		this.props.fetchCart(userId)
		.then(data => {
			if(!data.data.cart){
				this.setState({
					message: 'Your Shopping Cart is Empty.',
					messageClass: 'col-md-12 alert alert-dark'
				})
			}
		})
	}

	
	removeItemFromCart(item,i,e){
		e.preventDefault()

		this.props.removeItemFromCart(item,i)
		.then(data => {
			if(data.data == 0){
			}
		})
	}

	render() {
		const {message, messageClass} = this.state
		//Calculate total price
		let tot = 0 
		this.props.cart.cartList.map(item => {
		 	let newTot = (item.qty*item.product.price) + tot
		 	return tot = newTot
		})

		const items = this.props.cart.cartList.map((item,i) => {
			return (
			<div>
				<li className="list-group-item col-md-12 align-items-center" key="i" style={styles.li}>
				<img src="http://via.placeholder.com/200X200" alt="" className="img-thumbnail"/>
					<div className="card  col-md-8 float-right" style={styles.card}>
				  <div className="card-body">
				    <h3 className="card-title text-center">{item.product.brand} - {item.product.model}</h3>
				    <h5 className="card-subtitle my-2 text-right">Price: <strong>{item.product.price}</strong>$</h5>
				    <h5 className="card-subtitle my-2 text-right">Qty: <strong>{item.qty}</strong>Pc.</h5>
				    <h5 className="card-subtitle my-2 text-right">Size: <strong>{item.size}</strong></h5>
				    <button className="btn btn-primary btn-sm float-right" 
						onClick={this.removeItemFromCart.bind(this, item, i)}
				    >Remove Item
				    </button>
				  </div>
				</div>
				</li>
				<hr/>
			</div>
			)
		})

		return (
			<div className="container">
				<div className="row">
					<FlashMessage 
						class={messageClass}
						message={message}
					/>
				</div>
					<div className="row">
						<ul className="list-group" style={styles.ul}>
						{ (items == {}) ? <h3 className="text-center">Your Shopping Cart is Empty</h3> :
						 	items
						}
						</ul>
						<hr/>
						<Link type="button" className="btn btn-primary" to="/home">Continue Shopping</Link>
						<div  className="ml-auto">
							<h3>Total {tot}$</h3>
						</div>
					</div>
					<hr/>
					<div className="row justify-content-center">
						{tot !=0 ? <button className="btn btn-primary">Place an Order</button> : null }
					</div>
			</div>
		);
	}
}

const styles = {
	ul: {
		width: 100+'%'
	},
	li: {
		border: 'none',
		background: 'transparent'
	},
	card: {
		background: 'transparet',
		border: 'none'
	}
}

const stateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchCart: (userId) => dispatch(CartActions.fetchCart(userId)),
		removeItemFromCart: (item,i) => dispatch(CartActions.removeItemFromCart(item,i))
	}
}


export default connect(stateToProps, dispatchToProps)(Cart)