import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem , CardColumns, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import { NavLink, Redirect} from 'react-router-dom'

class Room extends Component {
	state = {
		room: '',
		roomName: ''
	}

	handleInputChange = (ev) => {
		this.setState({
			[ev.target.name]: ev.target.value
		})
	}

	createRoom = (ev) => {
		ev.preventDefault();
		this.setState({roomName: this.state.room, room: ''})
	}

	showChatRoom = () => {
		this.props.history.push('/room/' + this.state.roomName);
	}

	render() {
		return (
			<div>
				<Container>
				<div onClick={this.showChatRoom}>	               
	                {this.state.roomName}
	            </div>

				<Form.Row>
					<Form.Group as = {Col} controlId="formRoomMessage">			  		
					  <Form.Control name="room" value={this.state.room} onChange={this.handleInputChange} />
					</Form.Group>
					
					<Button type="submit" onClick={this.createRoom}>Create Room</Button>

				    </Form.Row>
		      </Container>
			</div>
		);
	}
}

export default Room