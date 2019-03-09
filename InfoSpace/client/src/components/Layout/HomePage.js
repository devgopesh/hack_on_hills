import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem , CardColumns, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import img from './user.jpg'

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { NavLink, Redirect} from 'react-router-dom'

class HomePage extends Component {

	componentDidMount() {
		this.props.fetchUsers();
		//this.props.findMessageRequest(this.props.user.id);
	}

	// sendRequest = (id) => {
	// 	let name = null;
	// 	this.props.users.map(user => {
	// 		if (user._id === this.props.user.id) {
	// 			name = user.name;
	// 			return;
	// 		}
	// 	})
	// 	const obj = {	
	// 		senderId: this.props.user.id,	
	// 	    receiverId: id,
	// 	    senderName: name
	// 	}				
	// 	this.props.messageRequest(obj);

	// }

	openChat = (id,name) => {
		let senderName = null;
		this.props.users.map(user => {
			if (user._id === this.props.user.id) {
				senderName = user.name;
				return;
			}
		})
		this.props.history.push('/chat/'+this.props.user.id+'/'+senderName+'/'+id+'/'+name)
	}

	renderUsers() {
		return this.props.users.map(user => {			
				if (user.isVerified) {
					return (
			        	<Card>
						    <Card.Img variant="top" src={img} />
						    <Card.Body>
						      <Card.Title>{user.name}</Card.Title>
						      <Card.Text>{user.roll}</Card.Text>
						      <Card.Text>{user.course}</Card.Text>
						    </Card.Body>						    
						    <Form.Row>
							
									<Card.Footer as={Col}>
							      <Button variant="primary" onClick={() => this.openChat(user._id,user.name)}> Chat</Button>
							    </Card.Footer>									    

							    <Card.Footer>
							      <Button variant="primary">View Profile</Button>
							    </Card.Footer>

						    </Form.Row>

					  </Card>
									    
					);
				}
			});	
	}

	render(){	
		return (
			<div>
				<Container>
					<CardColumns>
						{this.renderUsers()}
					</CardColumns>
		        </Container>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		user: state.auth.user,
		requests: state.auth.requests		
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: () => dispatch(actions.fetchUsers()),
		messageRequest: (obj) => dispatch(actions.messageRequest(obj)),
		findMessageRequest: (id) => dispatch(actions.findMessageRequest(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);