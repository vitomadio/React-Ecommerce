import constant from '../constants'

var initialState = {
	categoryList:[]
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	switch(action.type){
		case constant.CATEGORIES_FETCHED:
			newState['categoryList'] = action.data.payload
			return newState
		
		default: 
			return newState
	}
}