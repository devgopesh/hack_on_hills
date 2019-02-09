import * as actions from '../actions/actionTypes';
import isEmpty from '../../is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    token: null    
}

export default function(state = initialState, action ) {    
    switch(action.type) {
        case actions.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload.decoded),
                user: action.payload.decoded,
                token: action.payload.token                
            }
        default: 
            return state;
    }
}




// import * as actionTypes from '../actions/actionTypes';

// const initialState = {
// 	loading: false,
// 	token: null,
// 	userId: null,
// 	error: null
// }

// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case actionTypes.AUTH_START:
// 			return {
// 				...state,
// 				loading: true,
// 				error: null
// 			};
// 		case actionTypes.AUTH_SUCCESS:
// 			return {
// 				...state,
// 				userId: action.userId,
// 				token: action.token,
// 				error: null,
// 				loading: false
// 			};
// 		case actionTypes.AUTH_LOGOUT:
// 			return {
// 				...state,
// 				token: null,
// 				userId: null
// 			};
// 		case actionTypes.AUTH_FAIL:
// 			return {
// 				...state,
// 				error: action.error,
// 				loading: false
// 			};
// 		default:
// 			return state
// 	}
// }

// export default reducer;

