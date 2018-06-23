import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ProductActions, CartActions } from '../../actions'

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentDidMount(){
		const userId = this.props.user.currentUser._id
		this.props.fetchProducts()
		this.props.fetchCart(userId)
		.then(data => {
		})
	}

	showProduct(productId, e){
		e.preventDefault()
		this.props.fetchProduct(productId)
		this.props.history.push('/details')

	}

	render() {
		
		const products = this.props.product.Products.map((product) => {
			return (
				<div className="col-md-4">
						<div className="card">
					  <img type="button" className="card-img-top" src="http://via.placeholder.com/200x200" alt="Card image cap" 
							onClick={this.showProduct.bind(this, product._id)}
					  />
					  <div className="card-body p-3">
					    <h4 className="card-title text-center">{product.brand} - {product.model}</h4>
					    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, magni.</p>
							<p className="card-text text-right">Price: <strong>{product.price}$</strong></p>
					  </div>
					</div>
				</div>
			)
		})

		return (
			<div className="container">
				<div className="row justify-content-between mt-3">
					{products}
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		product: state.product,
		user: state.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchProducts: () => dispatch(ProductActions.fetchProducts()),
		fetchProduct: (productId) => dispatch(ProductActions.fetchProduct(productId)),
		fetchCart: (userId) => dispatch(CartActions.fetchCart(userId))
	}
}

export default connect(stateToProps, dispatchToProps)(Home)
