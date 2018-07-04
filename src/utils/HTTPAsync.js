import superagent from 'superagent'
import Promise from 'bluebird'
import axios from 'axios' //Uploading files only.

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

//Used Axios for file uploading.
const multipartRequest = (url, data) => {
	return axios.post(url,data.formData,data.config)
}

const delRequest = (url, body) => {
	console.log(url)
	return new Promise((resolve, reject) => {
		superagent.del(url)
		.send(body)
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
				console.log('DATA: ' + JSON.stringify(payload))
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

	upload: (url, data, actionType) => {
		return dispatch => multipartRequest(url, data)
		.then(data => {
			// console.log('DATA: ' + JSON.stringify(data))
			if(actionType != null){
				return dispatch({
					type: actionType,
					data: data.data.url
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