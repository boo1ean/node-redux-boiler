import React, { Component } from 'react';
import Navbar from '../components/navbar';

export default class App extends Component {
	render() {
		return (
			<div className="container container-fluid main-container">
				<Navbar/>
				{this.props.children}
			</div>
		);
	}
}
