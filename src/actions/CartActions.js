import constant from '../constants'
import { HTTPAsync } from '../utils'

const url = '/cart'

export default {

fetchCart: (userId) => {
	return dispatch => {
		return dispatch(HTTPAsync.get(url+'/'+userId, null, constant.CART_FETCHED))
	}
},

addToCart: (body) => {
	return dispatch => {
		return dispatch(HTTPAsync.post(url+'/add-to-cart/'+body.userId, body, constant.ADDED_TO_CART))
	}
},

removeItemFromCart: (item,i) => {
	console.log(JSON.stringify(i))
		const body = {
			cartId : item.cartId,
			idx: i
		}
	return dispatch => {
		return dispatch(HTTPAsync.del(url+'/remove-item/'+item._id, body, constant.ITEM_DELETED))
	}
}

}