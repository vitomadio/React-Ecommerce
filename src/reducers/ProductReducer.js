import constant from '../constants'

var initialState = {
	Products : [],
	item: {},
	sizes: [],
	urls: []
}

export default (state = initialState, action) => {
	
	let newState = Object.assign({}, state)
	let newUrls = Object .assign([], newState.urls)

	switch(action.type){
		case constant.PRODUCTS_FETCHED: 
			newState['Products'] = action.data.products
			return newState

		case constant.PRODUCT_FETCHED: 
			// console.log(JSON.stringify(action.data.product.sizes))
			newState['item'] = action.data.product
			newState['sizes'] = action.data.product.sizes
			return newState	

		case constant.PICTURES_UPLOADED:
			const path = action.data.path.replace('public','')
			newUrls.push(path)
			newState['urls'] = newUrls
			return newState

		case constant.PICTURE_DELETED:
			const idx = action.data.index
			newUrls.splice(idx,1) 	
			newState['urls'] = newUrls		
			return newState

		default:
			return newState
	}
}