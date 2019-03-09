import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'

//const socketUrl = "http://localhost:5000"
export default class Layout extends Component {
	state = {
	  	socket:null,
	  	user:null
	  }

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const socket = io('localhost:5000')

		socket.on('connect', ()=>{
			console.log("Connected");
			console.log(socket.id)
		})
		
		this.setState({socket})
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	setUser = (user)=>{
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user);
		this.setState({user})
	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = ()=>{
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({user:null})

	}


	render() {		
		const url = this.props.match.url.split('/');
		const obj = {
			senderName: url[3],
			senderId: url[2],
			receiverId: url[4],
			receiverName: url[5]
		}
		//console.log(url)
		const { title } = this.props
		const { socket } = this.state
		return (
			<div className="container">				
				<ChatContainer socket={socket} user={obj} logout={this.logout}/>				
			</div>
		);
	}
}
