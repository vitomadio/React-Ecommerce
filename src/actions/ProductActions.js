import constant from '../constants'
import { HTTPAsync } from '../utils'

const url = '/products'

export default {

	//Get Products
	fetchProducts: () => {
		return dispatch => {
			return dispatch(HTTPAsync.get( url, null,  constant.PRODUCTS_FETCHED)) 
		}
	},

	fetchProduct: (productId) => {
		return dispatch => {
			// console.log(JSON.stringify(productId))
		 return dispatch(HTTPAsync.get(url+'/'+productId, null,  constant.PRODUCT_FETCHED))
		}
	}


}