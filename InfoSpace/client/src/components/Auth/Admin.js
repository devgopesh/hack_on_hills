import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class Admin extends Component {
	state = {
		email: '',
		password: '',
		show: false,
		to: ''
	}

	handleSubmit = (ev) => {		
		ev.preventDefault();				
		if (this.state.email === 'gopeshsinghal123@gmail.com' && this.state.password === 'qwerty') {
			this.setState({show: true})
		}
	}

	handleAdmin = (ev) => {
		ev.preventDefault();
		this.props.sendMail(this.state.to);
	}

	handleInputChange = (event) => {		
		this.setState({[event.target.name]: event.target.value})
	}

	render() {
		let form = (
			<Container>
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
					<Button type="submit">Sign in</Button>
				</Form>
			</Container>
		);

		if (this.state.show) {
			form = (
				<Container>
					<Form onSubmit={this.handleAdmin}>
						<Form.Group controlId="formControlEmail">
							<Form.Label>To</Form.Label>
							<Form.Control type="email" placeholder="Email" name="to" required
								value={this.state.to} 
								onChange={ this.handleInputChange } />
						</Form.Group>									
						<Button type="submit">Send Mail</Button>
					</Form>
				</Container>
			);
		}
		return (
			<div>
				{form}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		sendMail: (mail) => dispatch(actions.sendMail(mail))
	}
}

export default connect(null, mapDispatchToProps)(Admin);
