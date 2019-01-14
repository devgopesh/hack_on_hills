import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Form.css'

class Form extends Component {
	state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            rollno: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Roll No.'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pnumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Phone Number'
                },
                value: '',
                validation: {
                    required: true,              
                    length: 10,             
                },
                valid: false,
                touched: false
            },         
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            branch: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'cse', displayValue: 'CSE'},
                        {value: 'eee', displayValue: 'EEE'}
                    ]
                },
                value: 'cse',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        selectedFile: null
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const data = {
            formData: formData,
            userId: this.props.userId
        }
        //formData.image = this.state.selectedFile;
        this.props.onSubmit(data, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            isValid = value.length == rules.length && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    fileChangedHandler = event => {
        this.setState({selectedFile: event.target.files[0]});
    }

	render() {
		const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <input type="file" onChange={this.fileChangedHandler} />
                <Button disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );

        let redirect = this.props.upload ? <Redirect to="/cse" /> : null;
        redirect = localStorage.getItem('home') ? <Redirect to="/cse" /> : null;
        
		return (
            <div className={classes.Form}>
                {redirect}
                {form}
            </div>            
		);
	}
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (form, token) => dispatch(actions.onSubmit(form, token))
    };
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        upload: state.form.upload
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);