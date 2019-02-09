// import * as actionTypes from './actionTypes';
// import axios from 'axios';

// export const onFormStart = () => {
// 	return {
// 		type: actionTypes.FORM_START
// 	};
// }

// export const onSuccess = (id, form) => {
// 	return {
// 		type: actionTypes.FORM_SUCCESS,
// 		id: id,
// 		formData: form
// 	};
// }

// export const onFail = (error) => {
// 	return {
// 		type: actionTypes.FORM_FAIL,
// 		error: error
// 	};
// }

// export const onSubmit = (form, token) => {
// 	return dispatch => {
// 		dispatch(onFormStart());
// 		axios.post( '/form.json?auth='+token, form)
//             .then( response => {
//                 localStorage.setItem('home', true); 
//                 dispatch(onSuccess(response.data.name, form));        
//             } )
//             .catch( error => {               
//                 dispatch(onFail(error));
//             } );
// 	};
// }