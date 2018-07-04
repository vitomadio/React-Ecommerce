import constant from '../constants'
import { HTTPAsync } from '../utils'

const url = '/products'

export default {

	//Get Products
	fetchProducts: () => {
		return (dispatch) => {
			return dispatch(HTTPAsync.get( url, null,  constant.PRODUCTS_FETCHED)) 
		}
	},
	//Get Product with Id
	fetchProduct: (productId) => {
		return (dispatch) => {
		 return dispatch(HTTPAsync.get(url+'/'+productId, null,  constant.PRODUCT_FETCHED))
		}
	},
	//Upload Produc Image
	uploadPictures: (formData, config) => {
		const data = {formData,config}
		return (dispatch) => {
			return dispatch(HTTPAsync.upload(url+'/upload', data, constant.PICTURES_UPLOADED))
		}
	},
	//Delete product image.
	deletePicture: (body) => {
		return (dispatch) => {
			return dispatch(HTTPAsync.post(url+'/delete-file', body, constant.PICTURE_DELETED))
		}
	}

}