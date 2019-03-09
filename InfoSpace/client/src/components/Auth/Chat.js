import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem , CardColumns, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import io from "socket.io-client";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

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
        	this.socket.emit('NEW_USER', {    	
        		userName: this.props.match.params.sender,
        		uId: this.socket.id
        	})
        })


        this.socket.on('RECEIVE_MESSAGE', function(data){        	
            addMessage(data);            	
        });
		
		this.componentWillUnmount = ()=> {
			this.socket.emit('REMOVE_USER', {    	
        		userName: this.props.match.params.sender,
        		uId: this.socket.id        		
        	})
		}

		window.addEventListener("beforeunload", (ev) => {
  			this.socket.emit('REMOVE_USER', {    	
        		userName: this.props.match.params.sender,
        		uId: this.socket.id        		
        	})
    	});
		        
        const addMessage = data => {            
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();           
    		const data = this.state.msg;

    		this.socket.emit('SEND_MESSAGE', {    	
            	message: this.state.msg,
            	userName: this.props.match.params.receiver
            })
            const msgObj = {
                senderId: this.props.user.id,
                receiverId: this.props.match.params.id,
                message: this.state.msg
            }
            this.props.privateMessage(msgObj);
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
                                <div>{message.message}</div>
                            )
                        })}
                    </div>

    				<Form.Row>
    					<Form.Group as = {Col} controlId="formGridMessage">
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

const mapStateToProps = state => {
    return {
        user: state.auth.user   
    };
}

const mapDispatchToProps = dispatch => {
    return {
        privateMessage: (msgObj) => dispatch(actions.privateMessage(msgObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);