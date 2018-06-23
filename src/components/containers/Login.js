import React, { Component } from 'react';
import { connect } from 'react-redux'
import { UserActions } from '../../actions'
import { FlashMessage, LoginLayout, SignupLayout } from '../layouts'


 class Login extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			message:null,
 			messageClass : null,
 			signupForm:false,
 			credentials: {
	 			email: null, 
	 			password: null
 			},
 			loginColor: 'black',
 			signupColor: 'grey'
 		}
 	}

 	login(e){
 		e.preventDefault()
 		let credentials = this.state.credentials
		this.props.login(credentials)
		.then((data) => {
			if(data.code){
				this.setState({message: data.message})
			}else if(!data.data.user){
				this.setState({
					message: data.data.message,
					messageClass: "alert alert-danger col-md-12"
				})
			}else{
				this.props.history.push('/home')
			}
		})
 	}

 	signUp(e){
 		e.preventDefault()
 		let credentials = this.state.credentials
		this.props.signUp(credentials)
		.then(data => {
			if(data.code){
				this.setState({message: data.message})
			}else{		
				this.setState({
					signupForm:false,
					loginColor: 'black',
					signupColor: 'grey',
					message: 'Please login with your new credentials'
				});					
			}
		})
 	}

	render() {

		const styles = {
			links: {
				textDecoration: 'none',
				fontSize: 1.5+'em',
				color: 'grey'
			}
		}

		const message = this.state.message
		const messageClass = this.state.messageClass
		const credentials = Object.assign({}, this.state.credentials)
		const signupForm = this.state.signupForm
		

		return (
			<div className="container">
				<div className="row justify-content-center" style={{marginTop: 25+'vh'}}>
					<div className="col-md-6 ">
					{(message !== null) ? <FlashMessage message={message} class={messageClass}/> : null}
						<div className="col-md-8 mx-auto text-center">
								<button 
									className="btn btn-link" 
									onClick={(e) => {
										this.setState({
											signupForm:false,
											loginColor: 'black',
											signupColor: 'grey'
										});
									}}
									style={{textDecoration:'none',fontSize:1.5+'em',color:this.state.loginColor}}
									>Login</button> <span style={styles.links}>/</span> 
								<button 
									className="btn btn-link" 
									onClick={(e) => this.setState({
										signupForm:true,
										loginColor: 'grey',
										signupColor: 'black'
									})}
									style={{textDecoration:'none',fontSize:1.5+'em',color:this.state.signupColor}}
									>Sign Up</button>
						
							{(signupForm == false) ?
								<LoginLayout 
								onChange={(attr, e) => {
									credentials[attr] = e.target.value
									this.setState({
										credentials: credentials 
									})
								}}
								login={this.login.bind(this)}
							/> : <SignupLayout 
								onChange={(attr, e) => {
									credentials[attr] = e.target.value
									this.setState({
										credentials: credentials 
									})
								}}
								signup={this.signUp.bind(this)}
								/> }
						</div>
					</div>
				</div>
			</div>
		);
	}

}


const stateToProps = (state) => {
	return {

	}
}

const dispatchToProps = (dispatch) => {
	return {
		login: (credentials) => dispatch(UserActions.login(credentials)),
		signUp: (credentials) => dispatch(UserActions.signUp(credentials))
		// createUserDocument: (body) => dispatch(UserActions.createUserDocument(body)),
		// checkIfUserExists: (user) => dispatch(UserActions.checkIfUserExists(user))
		
	}
}

export default connect(stateToProps, dispatchToProps)(Login)