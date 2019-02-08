import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';

class UsersForm extends Component { 
	state = {		
		checked: false
	}

	toggleCheckbox = (ev) => {
		if (ev.target.value === 'Alumni') {
			this.setState(prevState=> ({
				checked: true
			}))
		}
		else{
			this.setState(prevState=> ({
				checked: false
			}))
		}
		console.log(ev.target.value)
	} 

	render(){		
		return (
		<div>
			<Container>
				<Form>
				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridName">
				      <Form.Label>Full Name</Form.Label>
				      <Form.Control type="text" placeholder="Full Name" />
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridUsername">
				      <Form.Label>Username</Form.Label>
				      <Form.Control type="text" placeholder="Username" />
				    </Form.Group>
				  </Form.Row>

				<Form.Group controlId="formGridRollNo">
				  <Form.Label>Roll Number</Form.Label>
				  <Form.Control placeholder="Roll No." />
				</Form.Group>


				<Form.Group controlId="formGridCourse">
				    <Form.Label>Course</Form.Label>
				    <Form.Control as="select">
				      <option>Choose...</option>
				      <option>...</option>
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
					    <Form.Check type="radio" onChange={this.toggleCheckbox} value='Alumni' name="Person" label="Alumni" />
					  </Form.Group>

					  <Form.Group as = {Col} id="formGridCheckboxStudent">
					    <Form.Check type="radio" onChange={this.toggleCheckbox} value='Student' name="Person" label="Student" />
					  </Form.Group>
				  </Form.Row>

				  {this.state.checked ? <div>
				  		<Form.Group controlId="formGridProfession">
						  <Form.Label>Current Profession/ Research/ Preparation</Form.Label>
						  <Form.Control placeholder="Current profession" />
						</Form.Group>

						<Form.Group controlId="formGridPassing">
						  <Form.Label>Year of Passing</Form.Label>
						  <Form.Control placeholder="year of passing" />
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

export default UsersForm;
