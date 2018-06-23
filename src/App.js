import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './stores';

import Main from './components/Main.js';

const app = (
		<Provider store={store.configure(null)}>
				<Main />
		</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
			
