import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { ProductReducer, UserReducer, CartReducer } from '../reducers'

let store 
 export default {
 	configure: (state) => {
 		const reducers = combineReducers({
			product: ProductReducer,
			user: UserReducer,
			cart: CartReducer
 		})

 		if(state){
 			store = createStore(
				reducers, 
				state,
				applyMiddleware(thunk)
 				)
 			return store
 		}

 		store = createStore(
				reducers,
				applyMiddleware(thunk)
 			)
 		return store
 	},

 	currentStore: () => {
 		return store
 	}

 }