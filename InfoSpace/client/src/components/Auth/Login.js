import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Login.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

import io from 'socket.io-client'

class Login extends Component {
	state = {
		email: '',
		password: '',
		id: '',
		socket: null
	}

	// componentWillMount() {
	// 	this.initSocket()
	// }

	/*
	*	Connect to and initializes the socket.
	*/
	// initSocket = ()=>{
	// 	const socket = io('localhost:5000')
	// 	let id = null;

	// 	socket.on('connect', ()=>{
	// 		console.log("Connected");
	// 		console.log(socket.id)
	// 		this.props.updateSocket(socket.id, this.state.email)
	// 	})
	// 	//console.log(this.state.id)
	// 	localStorage.setItem('socket', socket)
	// 	this.setState({socket})
	// }

	handleSubmit = (ev) => {		
		ev.preventDefault();		
		this.props.loginUser(this.state, this.props.history);
		//this.initSocket()		
	}

	handleInputChange = (event) => {		
		this.setState({[event.target.name]: event.target.value})
	}

	render() {
		return (
			<div>
				<Container className={classes.login}>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="formControlsEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Email" name="email" required
								value={this.state.email} 
								onChange={ this.handleInputChange } />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="password" required
							 	value={this.state.password} 
								onChange={ this.handleInputChange } />
						</Form.Group>
						<Form.Group>
							<Form.Check type="checkbox" label="Remember Me" />
						</Form.Group>
						<Button type="submit">Sign in</Button>
					</Form>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user	
	};
}

const mapDispatchToProps = dispatch => {
	return {
		loginUser: (user, history) => dispatch(actions.loginUser(user, history))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);