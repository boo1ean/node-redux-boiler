import React, { Component, PropTypes as PT } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">node-redux-boiler</Link>
					</div>
					<ul className="nav navbar-nav">
						<li>
							<Link to="/">home</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
Navbar.propTypes = {};

export default Navbar;
