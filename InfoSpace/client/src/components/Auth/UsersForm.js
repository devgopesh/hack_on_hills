import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class UsersForm extends Component { 
	state = {		
		checked: false,
		userInfo: {
			name: '',
			username: '',
			roll: '',
			course: 'Cse',
			person: '',
			profession: '',
			passing: ''
		}
	}

	toggleCheckbox = (event) => {
		if (event.target.value === 'Alumni') {
			this.setState(prevState=> ({
				checked: true
			}))
		}
		else{
			this.setState(prevState=> ({
				checked: false
			}))
		}
		const obj = {
			...this.state.userInfo,
			[event.target.name]: event.target.value
		}
		this.setState({userInfo: obj})		
	} 

	handleInputChange = (event) => {
		const obj = {
			...this.state.userInfo,
			[event.target.name]: event.target.value
		}
		this.setState({userInfo: obj})
	}

	handleSubmit = (ev) => {		
		ev.preventDefault();
		const user = {
			...this.props.userCredentials,
			...this.state.userInfo
		}	

		this.props.registerUser(user, this.props.onHistory);
	}

	render(){		
		return (
		<div>
			<Container>
				<Form onSubmit={this.handleSubmit}>
				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridName">
				      <Form.Label>Full Name</Form.Label>
				      <Form.Control type="text" placeholder="Full Name" name="name" required
				      	value={this.state.userInfo.name} 
						onChange={ this.handleInputChange } />
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridUsername">
				      <Form.Label>Username</Form.Label>
				      <Form.Control type="text" placeholder="Username" name="username" required
				      	value={this.state.userInfo.username} 
						onChange={ this.handleInputChange } />
				    </Form.Group>
				  </Form.Row>

					<Form.Group controlId="formGridRollNo">
					  <Form.Label>Roll Number</Form.Label>
					  <Form.Control placeholder="Roll No." name="roll" required
					   	value={this.state.userInfo.roll} 
						onChange={ this.handleInputChange } />
					</Form.Group>


				<Form.Group controlId="formGridCourse">
				    <Form.Label>Course</Form.Label>
				    <Form.Control as="select" required name="course" 
				    	value={this.state.userInfo.course} 
						onChange={ this.handleInputChange }>
				      <option>Cse</option>
				      <option>ELectrical</option>
				    </Form.Control>
				</Form.Group>


				

				<Form.Group controlId="formGridAddress">
				  <Form.Label>Current Address</Form.Label>
				  <Form.Control placeholder="Current address" />
				</Form.Group>



				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridCity">
				      <Form.Label>City</Form.Label>
				      <Form.Control />
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridState">
				      <Form.Label>State</Form.Label>
				      <Form.Control as="select">
				        <option>Choose...</option>
				        <option>...</option>
				      </Form.Control>
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridPin">
				      <Form.Label>Pin</Form.Label>
				      <Form.Control />
				    </Form.Group>
				  </Form.Row>

				  <Form.Row>
					  <Form.Group as={Col} id="formGridCheckboxAlumni">
					    <Form.Check type="radio" onChange={this.toggleCheckbox} value='Alumni' required name="person" label="Alumni" />
					  </Form.Group>

					  <Form.Group as = {Col} id="formGridCheckboxStudent">
					    <Form.Check type="radio" onChange={this.toggleCheckbox} value='Student' required name="person" label="Student" />
					  </Form.Group>
				  </Form.Row>

				  {this.state.checked ? <div>
				  		<Form.Group controlId="formGridProfession">
						  <Form.Label>Current Profession/ Research/ Preparation</Form.Label>
						  <Form.Control placeholder="Current profession" required name="profession"
						  	value={this.state.userInfo.profession} 
							onChange={ this.handleInputChange } />
						</Form.Group>

						<Form.Group controlId="formGridPassing">
						  <Form.Label>Year of Passing</Form.Label>
						  <Form.Control placeholder="year of passing" required name="passing"
						  	value={this.state.userInfo.passing} 
							onChange={ this.handleInputChange }
						   />
						</Form.Group>


				  	</div> : null}

				  <Button variant="primary" type="submit">
				    Sign Up
				  </Button>
				</Form>

			</Container>
		</div>
		);
	}

}

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (user, history) => dispatch(actions.signupUser(user, history))
	}
}

export default connect(null, mapDispatchToProps)(UsersForm);
