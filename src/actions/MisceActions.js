import constant from '../constants'
import { HTTPAsync } from '../utils'

const url = '/miscellaneous'

export default  {

	fetchCategories: () => {
		return (dispatch) => {
			return dispatch(HTTPAsync.get(url+'/categories', null, constant.CATEGORIES_FETCHED))
		}
	},
	
	fetchSubCategories: (categoryName) => {
		return (dispatch) => {
			return dispatch(HTTPAsync.get(url+'/categories/'+categoryName, null, constant.SUB_CATEGORIES_FETCHED))
		}
	},

	addNewCategory: (name) => {
		return (dispatch) => {
			const body = {name:name}
			return dispatch(HTTPAsync.post(url+'/categories', body, constant.NEW_CATEGORY_ADDED))
		}
	},

	addNewSubCategory: (body) => {
		return (dispatch) => {
			return dispatch(HTTPAsync.post(url+'/sub-categories', body, constant.NEW_SUBCATEGORY_ADDED))
		}
	},

	fetchSizes: () => {
		return (dispatch) => {

		}
	}

}