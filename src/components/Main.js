import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, IndexRoute} from 'react-router-dom'
import { Home, Navigation, Dashboard } from './containers' 


class Main extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Route component={ Navigation } />
				</BrowserRouter>
			</div>
		);
	}
}

export default Main 