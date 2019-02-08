import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Login.css'

class Login extends Component {
	render() {
		return (
			<div>
				<Container className={classes.login}>
					<Form>
						<Form.Group controlId="formControlsEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Email" />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
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

export default Login;