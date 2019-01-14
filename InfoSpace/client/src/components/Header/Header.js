import React, { Component } from 'react';
import BranchLink from '../Branches/BranchLink/BranchLink';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'; 
import axios from 'axios'

import classes from './Header.css';

class Header extends Component {
	state = {
		userName: null
	}

	render() {
		// if (this.props.isAuthenticated) {
		// 	const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
		// 	axios.get('/form.json' + queryParams)
		// 		.then(res => {
		// 			for (let key in res.data) {
		// 				this.setState({userName: res.data[key].formData.name});
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err);
		// 		});
		// }

		return (
			<div>
				<Navbar inverse collapseOnSelect className={classes.header}>
					<Navbar.Header>
						<Navbar.Brand>
			      			<NavLink to='/'>INFOSPACE</NavLink>
			    		</Navbar.Brand>
					   	<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>				
					    <Nav pullRight>
					      <NavItem eventKey={1}>
					      	<NavLink to='/login'>Login</NavLink>
					      </NavItem>
					      <NavItem eventKey={2}>
							<NavLink to='/signup'>Signup</NavLink>
					      </NavItem>				      
					    </Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
};

// const mapStateToProps = state => {
// 	return {
// 		isAuthenticated: state.auth.token != null,
// 		token: state.auth.token,
// 		userId: state.auth.userId
// 	};
// }

// export default connect(mapStateToProps)(Header);

export default Header;