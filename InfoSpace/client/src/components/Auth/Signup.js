import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import classes from './Signup.css'

class Signup extends Component {
	render() {
		return (
			<div>
				<Grid className={classes.signup}>
					<Form>
						<FormGroup controlId="formControlsEmail">
							<ControlLabel>Email</ControlLabel>
							<FormControl type="email" placeholder="Email" />
						</FormGroup>
						<FormGroup controlId="formControlsPassword">
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" placeholder="Password" />
						</FormGroup>
						<FormGroup controlId="formControlsPassword">
							<ControlLabel>Confirm Password</ControlLabel>
							<FormControl type="password" placeholder="Confirm Password" />
						</FormGroup>
						<Button type="submit">Sign Up</Button>
					</Form>
				</Grid>
			</div>
		);
	}
}

export default Signup;