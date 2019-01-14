import * as actionTypes from '../actions/actionTypes';

const initialState = {
	loading: false,
	form: null,
	error: null,
	upload: false
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.FORM_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.FORM_SUCCESS:
			const data = {
				...action.formData,
				id: action.id
			}
			return {
				...state,
				loading: false,
				form: data,
				upload: true
			};
		case actionTypes.FORM_FAIL: 
			return {
				...state,
				error: action.error,
				loading: false
			};
		default:
			return state
	}
}

export default reducer;