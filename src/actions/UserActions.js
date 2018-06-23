import constant from '../constants'
import { HTTPAsync } from '../utils'

const url = '/authentication'

export default {

	signUp: (credentials) => {
		return (dispatch) => {
			return dispatch(HTTPAsync.post(url+'/signup', credentials, null))
		}
	},

	login: (credentials) => {
		return (dispatch) => {
			return dispatch(HTTPAsync.post(url+'/login', credentials, constant.CURRENT_USER_FETCHED))
		}
	}

}