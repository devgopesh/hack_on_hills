import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Login.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	handleSubmit = (ev) => {		
		ev.preventDefault();		
		this.props.loginUser(this.state, this.props.history);
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

const mapDispatchToProps = dispatch => {
	return {
		loginUser: (user, history) => dispatch(actions.loginUser(user, history))
	}
}

export default connect(null, mapDispatchToProps)(Login);