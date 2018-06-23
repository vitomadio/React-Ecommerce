import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CartActions } from '../../actions'
import { FlashMessage } from '../layouts'

class Details extends Component {
	constructor(props){
		super(props)
		this.state = {
			qty: 1,
			size: null,
			message: null,
			messageClass: null
		}
	}

	setQuantity(action, e){
		const qty = this.state.qty
		e.preventDefault()
		if(action == 'minus'){
			if(qty>=2){
				this.setState({
					qty:this.state.qty-1
				})
			}else{
				null
			}
		}else{
			this.setState({
				qty: this.state.qty+1
			})
		}
	}

	addToCart(productId, e){
		e.preventDefault()
		const size = parseInt(this.state.size)
		const qty = this.state.qty
		const userId = this.props.user.currentUser._id
		const body = {
			productId:productId,
			qty: qty,
			size: size,
			userId: userId
		}
		if(!size){
			this.setState({ 
				message:'you must select a size first',
				messageClass: 'alert alert-danger'
		})
		}else{
			this.props.addToCart(body)
			.then(data => {
				if(data.data.success == true){
					this.props.history.push('/cart')
				}else{
					this.setState({message: "Somenthing happened please try later."})
				}

			})
		}
	}

	render() {
		const qty = this.state.qty
		const product = this.props.product.item
		const sizes = this.props.product.sizes.map((size) => {
			return (
				<option value={size.size} >{size.size}</option>
				)
		})

		return (
			<div className="container">
				<FlashMessage 
					message={this.state.message}
					class= {this.state.messageClass}
				/>
				<div className="row justify-content-between mt-3">
					<div className="col-md-6">
					<img src="http://via.placeholder.com/400x400" alt="..." className="card-image-top" style={{width: '100%', height:400}}/>
					</div>
					<div className="col-md-6">
					<div className="card p-3">
						<h4 className="card-title text-center">{product.brand} - {product.model}</h4>
						<div className="card-body">
						<div className="row">
							<div className="col-md-6">
								<select className="custom-select" onChange={(e) => this.setState({size: e.target.value})}>
									<option selected >Select size</option>
									{sizes}
								</select>
							</div>
							<div className="col-md-6">
								<p className="card-title text-right">Price: <strong>{product.price}$</strong></p>
							</div>
						</div>
						<div className="col-md-4 p-0 mt-3">
							<div className="input-group">
								<div className="input-group-prepend" type="button"
										onClick={this.setQuantity.bind(this, 'minus')}
									>
									<span className="input-group-text">
										<i className="fas fa-minus"></i>
									</span>
								</div>
								<input type="text" className="form-control" aria-label="Amount" value={qty}/>
								<div className="input-group-append" type="button"
									onClick={this.setQuantity.bind(this, 'plus')}
									>
									<span className="input-group-text">
										<i className="fas fa-plus"></i>
									</span>
								</div>
							</div>
						</div>
						</div>
					</div>
					<button 
						className="btn btn-primary mt-5"
						onClick={this.addToCart.bind(this, product._id)}
					>
					Add to Cart
					</button>
					</div>
				</div>
			</div>
			);
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
		addToCart: (body) => dispatch(CartActions.addToCart(body))
	}
} 

export default connect(stateToProps, dispatchToProps)(Details)