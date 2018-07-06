import constant from '../constants'

var initialState = {
	categoryList:[],
	subCategoryList:[]
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	switch(action.type){
		case constant.CATEGORIES_FETCHED:
			newState['categoryList'] = action.data.payload
			return newState

		case constant.SUB_CATEGORIES_FETCHED:
			newState['subCategoryList'] = action.data.payload.subCategories

			return newState
		
		default: 
			return newState
	}
}