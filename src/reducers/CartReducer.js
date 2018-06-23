import constant from '../constants'

var initialState = {
	cartList : []
}

export default (state = initialState, action) => {
	const newState = Object.assign({}, state)
	const newList = Object.assign([], newState.cartList)	
	switch(action.type){
	
	case constant.CART_FETCHED: 
		if(action.data.cart != null){
			newState['cartList'] = action.data.cart.items
		}
		return newState

	case constant.ITEM_DELETED: 
		newList.splice(action.data, 1)
		newState['cartList'] = newList
		return newState

	default: 
		return newState

	}

}