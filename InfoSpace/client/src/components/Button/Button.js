import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class button extends Component {
	sendRequest = (id) => {
		let name = null;
		this.props.users.map(user => {
			if (user._id === this.props.user.id) {
				name = user.name;
				return;
			}
		})
		const obj = {	
			senderId: this.props.user.id,	
		    receiverId: id,
		    senderName: name
		}				
		this.props.messageRequest(obj);

	}
	
	render() {
	return (
		<button onClick={() => this.sendRequest(this.props.clicked)}>
			{this.props.children}
		</button>
	);
	}
};

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		user: state.auth.user		
	};
}

const mapDispatchToProps = dispatch => {
	return {
		messageRequest: (obj) => dispatch(actions.messageRequest(obj))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(button);