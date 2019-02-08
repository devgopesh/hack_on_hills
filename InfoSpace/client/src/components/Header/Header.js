import React, { Component } from 'react';
import BranchLink from '../Branches/BranchLink/BranchLink';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'; 
import axios from 'axios'
import zulip from 'zulip-js'
import path from 'path'

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
				<Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className={classes.head}>
          <Navbar.Brand>InfoSpace</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">       
            <Nav>
              <Nav.Link>
                  Home
              </Nav.Link>
              <Nav.Link>
                About
              </Nav.Link> 
              <Nav.Link>
                Contact
              </Nav.Link>                        
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