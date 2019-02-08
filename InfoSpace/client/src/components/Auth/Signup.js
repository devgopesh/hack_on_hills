import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import classes from './Signup.css'
import axios from 'axios'
import UsersForm from './UsersForm'

class Signup extends Component {	
	state = {
		show: false		
	}

	showUsersForm = () => {
		this.setState({show: true});
	}

	render() {
		let showForm = (
			<div>
				<Grid className={classes.signup}>
					<Form onSubmit={this.onSignup}>
						<FormGroup controlId="formControlsEmail">
							<ControlLabel>Email</ControlLabel>
							<FormControl type="email" placeholder="Email" name="email" />
						</FormGroup>
						<FormGroup controlId="formControlsEmail">
							<ControlLabel>Full Name</ControlLabel>
							<FormControl type="text" placeholder="Name" name="full_name" />
						</FormGroup>
						<FormGroup controlId="formControlsEmail">
							<ControlLabel>Username</ControlLabel>
							<FormControl type="text" placeholder="username" name="short_name" />
						</FormGroup>
						<FormGroup controlId="formControlsPassword">
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" placeholder="Password" name="password" />
						</FormGroup>						
						<Button onClick={this.showUsersForm}>Next</Button>
					</Form>
				</Grid>
			</div>
		);

		if (this.state.show) {
			showForm = <UsersForm />
		}
		

		return (
			<div>
				{showForm}
			</div>
		);
	}
}

export default Signup;