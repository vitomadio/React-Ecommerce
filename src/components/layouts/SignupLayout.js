import React from 'react';

const SignupLayout = (props) => {

  return (
    <form id="form">
			<div className="form-group">
				<label className="sr-only" for="email">Email:</label>
				<input
					className="form-control" 
					type="email"
					placeholder="Email"
					onChange={props.onChange.bind(this, 'email')}
					/>
			</div>
			<div className="form-group">
				<label className="sr-only" for="password">Email:</label>
				<input 
					className="form-control"
					type="password"
					placeholder="Password"
					onChange={props.onChange.bind(this, 'password')}
					/>
			</div>
			<button className="btn btn-primary" onClick={props.signup}>Sign Up</button>
		</form>
  )
}

export default SignupLayout;