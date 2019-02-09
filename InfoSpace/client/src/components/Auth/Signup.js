import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Signup.css'
import axios from 'axios'
import UsersForm from './UsersForm'

class Signup extends Component {	
	state = {
		show: false,
		userCredentials: {
			email: '',
			password: '',
			password_confirm: ''
		}	
	}

	showUsersForm = () => {
		this.setState({show: true});
	}

	handleInputChange = (event) => {
		const obj = {
			...this.state.userCredentials,
			[event.target.name]: event.target.value
		}
		this.setState({userCredentials: obj})
	}

	render() {		
		let showForm = (
			<div>
				<Container className={classes.signup}>
					<Form>
						<Form.Group controlId="formControlsEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Email" name="email"
								value={this.state.userCredentials.email} 
								onChange={ this.handleInputChange } />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="password"
								value={this.state.userCredentials.password} 
								onChange={ this.handleInputChange } />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Confirm Password" name="password_confirm"
								value={this.state.userCredentials.password_confirm} 
								onChange={ this.handleInputChange } />
						</Form.Group>
						<Button onClick={this.showUsersForm}>Next</Button>
					</Form>
				</Container>
			</div>
		);

		if (this.state.show) {
			showForm = <UsersForm userCredentials={this.state.userCredentials} onHistory={this.props.history} />
		}
		

		return (
			<div>
				{showForm}
			</div>
		);
	}
}

export default Signup;