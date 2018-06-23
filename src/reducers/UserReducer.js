import constant from '../constants'

var initialState = {
	currentUser: null
}

export default (state = initialState , action) => {
	let newState = Object.assign({}, state)

	switch(action.type) {
		case constant.CURRENT_USER_FETCHED: 
		newState['currentUser'] = action.data.user
		return newState

		default: 
		return newState
	}
}