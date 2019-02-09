import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './Signup.css'
import classNames from 'classnames';
import validator from 'validator';


class Signup extends Component {

	    formDefaults = {
        email: { value: '', isValid: true, message: '' },
        password: { value: '', isValid: true, message: '' },
        confirmPassword: { value: '', isValid: true, message: '' }
      }

      state = {
        ...this.formDefaults
      };

      onChange = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: {
            ...this.state[e.target.name],
            value: e.target.value,
          }
        };

        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
        // reset states before the validation procedure is run.
        this.resetValidationStates();
        // run the validation, and if it's good move on.
        if (this.formIsValid()) {
          // form processing here....
        }
      }

      formIsValid = () => {
        const email = { ...this.state.email };
        const password = { ...this.state.password };
        const confirmPassword = { ...this.state.confirmPassword };
        let isGood = true;

        if (!validator.isEmail(email.value)) {
          email.isValid = false;
          email.message = 'Not a valid email address';
          isGood = false;
        }

        if(confirmPassword.value!==password.value){
        	confirmPassword.isValid = false;
        	confirmPassword.message = 'Password doesn\'t match';
        	isGood = false;
        }

        // perform addtion validation on password and confirmPassword here...

        if (!isGood) {
          this.setState({
            email,
            password,
            confirmPassword,
          });
        }

        return isGood;
      }

      resetValidationStates = () => {
        // make a copy of everything in state
        const state = JSON.parse(JSON.stringify(this.state));

        /*
        loop through each item in state and if it's safe to assume that only
        form values have an 'isValid' property, we can use that to reset their
        validation states and keep their existing value property. This process
        makes it easy to set all validation states on form inputs in case the number
        of fields on our form grows in the future.
        */
        Object.keys(state).map(key => {
          if (state[key].hasOwnProperty('isValid')) {
            state[key].isValid = true;
            state[key].message = '';
          }
        });

        this.setState(state);
      }

      resetForm = () => {
        this.setState(...this.formDefaults);
      }


	render() {

		const { email, password, confirmPassword } = this.state;
        /*
        Each of the group classes below will include the 'form-group' class,
        and will only include the 'has-error' class if the isValid value is false.
        */
        const emailGroupClass = classNames('form-group',
          { 'has-error': !email.isValid }
        );
        const passwordGroupClass = classNames('form-group',
          { 'has-error': !password.isValid }
        );
        const confirmGroupClass = classNames('form-group',
          { 'has-error': !confirmPassword.isValid }
        );

		return (
			<div>
				<Container className={classes.signup}>
					<Form onSubmit={this.onSubmit}>

						<Form.Group controlId="formControlsEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="text" placeholder="Email" 
							value={this.state.value}
	                  		onChange={this.onChange}
	                  		autoFocus/>
	                  		<span className="text-muted">{email.message}</span>
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group controlId="formControlsPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Confirm Password" />
						</Form.Group>
						<Button type="submit">Sign Up</Button>
					</Form>
				</Container>
			</div>

			 // <Container>
			// 	<div className="container">
	  //           <form className="form-signin" onSubmit={this.onSubmit}>
	      

	  //             <div className={emailGroupClass}>
	  //             	<label for = "email">
	  //             		Email : 
	  //             	</label>
	  //               <input
	  //                 type="text"
	  //                 name="email"
	  //                 className="form-control"
	  //                 placeholder="Email address"
	  //                 value={email.value}
	  //                 onChange={this.onChange}
	  //                 autoFocus
	  //               />
	  //               <span className="text-muted">{email.message}</span>
	  //             </div>

	  //             <div className={passwordGroupClass}>
	  //             	<label for = "email">
	  //             		Password : 
	  //             	</label>
	  //               <input
	  //                 type="password"
	  //                 name="password"
	  //                 className="form-control"
	  //                 placeholder="Password"
	  //                 value={password.value}
	  //                 onChange={this.onChange}
	  //               />
	  //               <span className="text-muted">{password.message}</span>
	  //             </div>

	  //             <div className={confirmGroupClass}>
	  //             	<label for = "email">
	  //             		Confirm Password : 
	  //             	</label>
	  //               <input
	  //                 type="password"
	  //                 name="confirmPassword"
	  //                 className="form-control"
	  //                 placeholder="Confirm Password"
	  //                 value={confirmPassword.value}
	  //                 onChange={this.onChange}
	  //               />
	  //               <span className="text-muted">{confirmPassword.message}</span>
	  //             </div>

	  //             <button
	  //               className="btn btn-lg btn-primary btn-block"
	  //               type="submit"
	  //             >
	  //               Next
	  //             </button>
	  //           </form>
	  //         </div>
	  //   	</Container>
		);
	}
}

export default Signup;