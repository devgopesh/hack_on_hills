import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import classes from './Login.css'

class Login extends Component {
	render() {
		return (
			<div>
				<Grid className={classes.login}>
					<Form>
						<FormGroup controlId="formControlsEmail">
							<ControlLabel>Email</ControlLabel>
							<FormControl type="email" placeholder="Email" />
						</FormGroup>
						<FormGroup controlId="formControlsPassword">
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" placeholder="Password" />
						</FormGroup>
						<FormGroup>
							<Checkbox>Remember me</Checkbox>
						</FormGroup>
						<Button type="submit">Sign in</Button>
					</Form>
				</Grid>
			</div>
		);
	}
}

export default Login;