import superagent from 'superagent'
import Promise from 'bluebird'

const getRequest = (url, params) => {

	return new Promise((resolve, reject) => {
		superagent.get(url)
		.query(params)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if (err){
				reject(err)
				 console.log(err.message)
				return
			}

			const payload = response.body || response.text
			resolve(payload)
		})
	})
}

const postRequest = (url, body) => {
	return new Promise((resolve, reject) =>{ 
		superagent.post(url)
		.send(body)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if(err){
				reject(err)
				console.log(err.message)
				return
			}
			const payload = response.body || response.text
			resolve(payload)
		})
	})
}

const delRequest = (url, body) => {
	return new Promise((resolve, reject) => {
		superagent.del(url)
		.send({cartId: body.cartId, idx: body.idx})
		.set('Accept', 'application/json')
		.end((err, response) => {
			if (err) {
				reject(err)
				console.log(err.message)
				return
			}
			const payload = response.body || response.text
			resolve(payload)
		})
	})
}


export default {
	get: (url, params, actionType) => {
	
		return dispatch => getRequest(url, params)
			.then(payload => {
				// console.log('DATA: ' + JSON.stringify(payload))
				if (actionType != null){
					return dispatch({
						type: actionType,
						data: payload
					})
				}
				return payload
			})
			.catch(err => {
				throw err
			})
	},

	post: (url, body, actionType) => {
		return dispatch => postRequest(url, body)
		.then(data => {
			// console.log('DATA: ' + JSON.stringify(data))
			if(actionType != null){
				return dispatch({
					type: actionType,
					data: data
				})
			}
			return data
		})
		.catch(err => {
			throw err
		})
	}, 

	del: (url, body, actionType) => {
		return dispatch => delRequest(url, body, actionType)
		.then (data => {
			if(actionType != null){
				return dispatch({
					type: actionType,
					data: body.idx
				})
			}
			return data
		})
		.catch(err => {
			throw err
		})
	}
}