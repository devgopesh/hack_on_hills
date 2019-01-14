import React, { Component } from 'react';
import axios from 'axios';
import classes from '../Branch.css';
import Spinner from '../../../UI/Spinner/Spinner';
import { connect } from 'react-redux';

class Cse extends Component {
	state = {
		data: null,
		loading: false
	}

	componentDidMount() {
		this.setState({loading: true});
		axios.get('/form.json?auth='+ this.props.token)
			.then(response => {
				this.setState({data: response.data, loading: false});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		let studData = [];
		if (this.state.data) {
			for(let i in this.state.data) {
				if (this.state.data[i].formData.branch === 'eee') {
					studData.push({
						name: this.state.data[i].formData.name,
						rollno: this.state.data[i].formData.rollno
					});
				}
			}
		}

		let sInfo = (
			<div className={classes.wrapper}>
				{studData.map(info => (
					<div className={classes.box}>
						<h1>{info.name}</h1>
						<h4>{info.rollno}</h4>
					</div>
				))}
			</div>
		);

		if (this.state.loading) {
			sInfo = <Spinner />
		}

		return (
			<div >
				{sInfo}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
}

export default connect(mapStateToProps)(Cse);