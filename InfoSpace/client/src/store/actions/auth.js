import axios from 'axios';
import * as actions from './actionTypes';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

// export const authStart = () => {
// 	return {
// 		type: actionTypes.AUTH_START
// 	};
// }

// export const authSuccess = (token, userId) => {
// 	return {
// 		type: actionTypes.AUTH_SUCCESS,
// 		token: token,
// 		userId: userId
// 	};
// }

// export const logout = () => {
// 	localStorage.removeItem('token');
//     localStorage.removeItem('expirationDate');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('home');
// 	return {
// 		type: actionTypes.AUTH_LOGOUT
// 	};
// }

// export const checkAuthTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime * 1000);
//     };
// };

// export const authFail = (error) => {
// 	return {
// 		type: actionTypes.AUTH_FAIL,
// 		error: error
// 	};
// }

export const signupUser = (user, history) => {
	return dispatch => {
		//dispatch(authStart());	
		axios.post('/register', user)
			.then(res => {
				//cnst expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                // dispatch(authSuccess(response.data.idToken, response.data.localId));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);   
                const obj = {
                    decoded,
                    token
                }                        
                dispatch(setCurrentUser(obj));
            })
            .catch(err => {
                dispatch({
                    type: actions.GET_ERRORS,
                    payload: err.response.data
                });
            });			
			// .catch(error => {
			// 	dispatch(authFail(error.response.data.error));
			// });
	};
}

export const loginUser = (user) => dispatch => {
    axios.post('/login', user)
            .then(res => {                
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);   
                const obj = {
                    decoded,
                    token
                }                        
                dispatch(setCurrentUser(obj));
            })
            .catch(err => {
                dispatch({
                    type: actions.GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = obj => {
    return {
        type: actions.SET_CURRENT_USER,
        payload: obj
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            dispatch(logoutUser());
        } else {
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
                dispatch(logoutUser());               
            }           
        }
    };
};

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             dispatch(logout());
//         } else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'));
//             if (expirationDate <= new Date()) {
//                 dispatch(logout());
//             } else {
//                 const userId = localStorage.getItem('userId');
//                 dispatch(authSuccess(token, userId));
//                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
//             }   
//         }
//     };
// };


