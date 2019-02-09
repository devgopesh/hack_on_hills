import React, { Component } from 'react';
import BranchLink from '../Branches/BranchLink/BranchLink';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'

import classes from './Header.css';

class Header extends Component {
	state = {
		userName: null
	}	

	onLogout = () => {
		this.props.onLogout();
		this.props.history.push('/')
	}

	render() {		
		let show = (
			<div>
				<Nav>		            	
	              <Nav.Link>
	                  <NavLink to='/login'>Login</NavLink>
	              </Nav.Link>
	              <Nav.Link>
	                <NavLink to='/signup'>Signup</NavLink>
	              </Nav.Link>                       
	            </Nav>
			</div>
		);

		if (localStorage.getItem('jwtToken') && localStorage.getItem('isVerified')) {
			show = (
				<Nav>		            		              
	              <Nav.Link onClick={this.onLogout}>
	                Logout
	              </Nav.Link>                       
	            </Nav>
			);
		}

		return (
			<div>
				<Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
		          <Navbar.Brand>InfoSpace</Navbar.Brand>
		          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">       
		            {show}
		          </Navbar.Collapse>
		        </Navbar>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token != null,
		token: state.auth.token,
		userId: state.auth.userId		
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logoutUser())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);