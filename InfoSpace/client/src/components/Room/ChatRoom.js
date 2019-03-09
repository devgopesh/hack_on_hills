import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem , CardColumns, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import io from "socket.io-client";

class Chat extends Component {
	constructor(props){
        super(props);

        this.state = {
            msg: '',
            messages: [],
            room: ''
        };

        this.socket = io('localhost:5000');

        this.socket.on('connect', () => {
        	this.socket.emit('JOIN_ROOM', {    	
        		roomName: this.props.match.params.room
        	})
        })


        this.socket.on('RECEIVE_MESSAGE_ROOM', function(data){        	
            addMessage(data);            			
        });
		
		this.componentWillUnmount = ()=> {
			this.socket.emit('LEAVE_ROOM', {    	
        	   roomName: this.props.match.params.room            		
            })
		}

		window.addEventListener("beforeunload", (ev) => {
  			this.socket.emit('LEAVE_ROOM', {    	
        		roomName: this.props.match.params.room          		
        	})
    	});

        const addMessage = data => {            
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();            
    		const data = this.state.msg;

    		this.socket.emit('SEND_MESSAGE_ROOM', {    	
            	msg: this.state.msg,
                roomName: this.props.match.params.room         	
            })
            this.setState({msg: ''})
        }

        this.handleInputChange = (ev) => {
    		this.setState({
    			[ev.target.name]: ev.target.value
    		})
    	}
    }

	render(){		
		return (
			<div>
				<Container>
    				<div >
                        {this.state.messages.map(message => {
                            return (
                                <div>{message.msg}</div>
                            )
                        })}
                    </div>

    				<Form.Row>
    					<Form.Group as = {Col} controlId="formRoomMessage">
    					  <Form.Label>Send Message to User</Form.Label>
    					  <Form.Control placeholder="Your Message" name="msg" value={this.state.msg} onChange={this.handleInputChange} />
    					</Form.Group>
    					
    					<Button type="submit" onClick={this.sendMessage}>Send</Button>
				    </Form.Row>
		      </Container>
			</div>
		)
	}
}

export default Chat;