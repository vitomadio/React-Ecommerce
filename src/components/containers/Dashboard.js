import React, { Component } from 'react';
import { ProductForm } from '../containers'

class Dashboard extends Component {
	constructor(){
		super()
		this.state = {
			liClass: ''
		}
	}

	onHover(e){
		e.preventDefault()
		var div = e.target.firstElementChild
		div.className = "arrow float-right"
	}
	
	onOut(e){
		e.preventDefault()
		var div = e.target.firstElementChild
		div.className = ""
	}


	render() {
		return (
			<div className="container-fluid p-0">
				<div className="row no-gutters" style={styles.row}>
					{/*SIDEBAR*/}
					<div className="col-md-3 sidebar" style={styles.sidebar}>
						<ul className="list-group mt-5" style={{borderRadius:0}}>
							<li className="list-group-item side-item"
							onMouseEnter={this.onHover.bind(this)}
							onMouseOut={this.onOut.bind(this)}
							>
								<div className=""></div>
								<button className="btn btn-link"> Orders</button>
							</li>
							<li className="list-group-item side-item"
							onMouseEnter={this.onHover.bind(this)}
							onMouseOut={this.onOut.bind(this)}
							>
								<div className=""></div>
								<button className="btn btn-link"> Sales</button>
							</li>
							<li className="list-group-item side-item"
							onMouseEnter={this.onHover.bind(this)}
							onMouseOut={this.onOut.bind(this)}
							>
								<div className=""></div>
								<button className="btn btn-link"> Add Product</button>
							</li>
							<li className="list-group-item side-item"
							onMouseEnter={this.onHover.bind(this)}
							onMouseOut={this.onOut.bind(this)}
							>
								<div className=""></div>
								<button className="btn btn-link"> Something else</button>
							</li>
						</ul>
					</div>

					{/*Display*/}
					<div className="col-md-9" style={styles.display}>
						<ProductForm/>
					</div>
	
				</div>
			</div>
		);
	} 
}

const styles = {
	row: {
		marginTop:2+'em'
	},
	display: {
		overflowY:'scroll',
		height: 100+'vh',
		paddingBottom:2+'em'
	}
}



export default Dashboard