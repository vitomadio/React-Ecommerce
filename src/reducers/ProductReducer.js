import constant from '../constants'

var initialState = {
	Products : [],
	item: {},
	sizes: []
}

export default (state = initialState, action) => {
	
	let newState = Object.assign({}, state)

	switch(action.type){
		case constant.PRODUCTS_FETCHED: 
			newState['Products'] = action.data.products
			return newState

		case constant.PRODUCT_FETCHED: 
			// console.log(JSON.stringify(action.data.product.sizes))
			newState['item'] = action.data.product
			newState['sizes'] = action.data.product.sizes
			return newState	

		default:
			return newState
	}
}