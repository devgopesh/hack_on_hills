import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Form from '../Form/Form';
import classes from './Auth.css'

class Auth extends Component {
	state = {
		
	}

	// checkValidity = (value, rules) => {
	// 	let isValid = true;

	// 	if ( rules.required ) {
 //            isValid = value.trim() !== '' && isValid;
 //        }

	// 	if (rules.minLength) {
	// 		isValid =  value.length >= rules.minLength && isValid;
	// 	}

	// 	if ( rules.isEmail ) {
 //            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
 //            isValid = pattern.test( value ) && isValid
 //        }
 //        return isValid;
	// }

	// inputChangedHandler = (event, controlName) => {
	// 	const updatedControlForm = {
	// 		...this.state.controls,
	// 		[controlName]: {
	// 			...this.state.controls[controlName],
	// 			value: event.target.value,
	// 			touched: true,
	// 			valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation )
	// 		}
	// 	}
	// 	this.setState({controls: updatedControlForm});
	// }

	// submitHandler = (event) => {
	// 	event.preventDefault();
	// 	this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	// }

	// switchAuthModeHandler = () => {
 //        this.setState(prevState => {
 //            return {isSignUp: !prevState.isSignUp};
 //        });
 //    }

	render() {
		const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            )                  
        );

        if (this.props.loading) {
        	form = <Spinner />
        }

        let authDirect = null;
        if (this.props.isAuthenticated && this.state.isSignUp) {
        	authDirect = <Redirect to="/form" />
        } else if (this.props.isAuthenticated && !this.state.isSignUp) {
        	localStorage.setItem('home', true);
        	authDirect = <Redirect to="/cse" />
        }  

		return (
			<div className={classes.Auth}>
				{authDirect}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button>
						{this.state.isSignUp ? 'SignUp' : 'LogIn'}
					</Button>
				</form>	
				<div>
					{this.state.isSignUp ? 
						<a onClick={this.switchAuthModeHandler} className={classes.Anchor}><span className={classes.Span}>Already have a account?</span> Login</a> :
						<a onClick={this.switchAuthModeHandler} className={classes.Anchor}><span className={classes.Span}>New Member?</span> Signup</a>
					}
				</div>	
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		isAuthenticated: state.auth.token != null
	};
}

const mapDispatchToProps = dispatch => {
	return{
		onAuth: (email, password, isSignUp) => dispatch(actions.onAuth(email, password, isSignUp))
	};
} 

export default connect(mapStateToProps, mapDispatchToProps)(Auth);