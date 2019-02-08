import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Login.css'

class Login extends Component {
	render() {
		return (
			<div>
				<Container className={classes.login}>
					<Form>
						<FormGroup controlId="formControlsEmail">
							<ControlLabel>Email</ControlLabel>
							<FormControl type="email" placeholder="Email" name="email" />
						</FormGroup>
						<FormGroup controlId="formControlsPassword">
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" placeholder="Password" name="password" />
						</FormGroup>
						<FormGroup>
							<Checkbox>Remember me</Checkbox>
						</FormGroup>
						<Button type="submit">Sign in</Button>
					</Form>
				</Container>
			</div>
		);
	}
}

export default Login;