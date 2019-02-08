import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Signup.css'

class Signup extends Component {
	render() {
		return (
			<div>
				<Container className={classes.signup}>
					<Form>
						<Form.Group controlId="formControlsEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Email" />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Confirm Password" />
						</Form.Group>
						<Button type="submit">Sign Up</Button>
					</Form>
				</Container>
			</div>
		);
	}
}

export default Signup;