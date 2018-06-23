import React, { Component } from 'react';
import { ProductForm } from '../containers'

class Dashboard extends Component {
	render() {
		return (
			<div className="container-fluid p-0">
				<div className="row no-gutters">
					{/*SIDEBAR*/}
					<div className="col-md-3 sidebar">
						<ul className="list-group mt-5" style={{borderRadius:0}}>
							<li className="list-group-item side-item">
								<button className="btn btn-link"> Orders</button>
							</li>
							<li className="list-group-item side-item">
								<button className="btn btn-link"> Sales</button>
							</li>
							<li className="list-group-item side-item">
								<button className="btn btn-link"> Add Product</button>
							</li>
							<li className="list-group-item side-item">
								<button className="btn btn-link"> Something else</button>
							</li>
						</ul>
					</div>

					{/*Display*/}
					<div className="col-md-9">
						<ProductForm/>
					</div>
	
				</div>
			</div>
		);
	}
}



export default Dashboard