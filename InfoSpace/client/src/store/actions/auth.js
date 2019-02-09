import axios from 'axios';
import * as actions from './actionTypes';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';

// import nodemailer from 'nodemailer';
// import xoauth2 from 'xoauth2'
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
        console.log(user)        
		axios.post('/api/users/register', user)
			.then(res => {
				//cnst expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                // dispatch(authSuccess(response.data.idToken, response.data.localId));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
                console.log(res.data);
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);   
                const obj = {
                    decoded,
                    token
                }                        
                dispatch(setCurrentUser(obj));
                alert("Wait for verification")
                // let transporter = nodemailer.createTransport({
                // service: 'gmail',
                // host: 'smtp.gmail.com',
                // secure: 'true',
                // port: '465',
                // auth: {
                // type: 'OAuth2', //Authentication type
                // user: 'gopeshsinghal123@gmail.com', //For example, xyz@gmail.com
                // clientId: '1039234355869-f498ailtt61jglhn8smc0sbrt7iip3g7.apps.googleusercontent.com',
                // clientSecret: 'Gcoaq8J1dEWTddHt3jllm5Cc',
                // refreshToken: '1/qiFt7WS9tqRK2YqhyhkqPWPJW0_Kvd6xxfYR67x0T8A'
                //      }
                // });

                // let mailOptions = {
                // from: 'gopeshsinghal123@gmail.com',
                // to: res.data.user.email,
                // subject: 'This is subject',
                // text: 'This is email content'};

                // transporter.sendMail(mailOptions, function(e, r) {
                // if (e) {
                //   console.log(e);
                // }
                // else {
                //   console.log(r);
                //     }
                // transporter.close();
                // });
                //history.push('/signup/verification/' + res.data.user._id);
            })
            .catch(err => {
                dispatch({
                    type: actions.GET_ERRORS,
                    payload: err.response.data
                });
                console.log(err)
            });			
			// .catch(error => {
			// 	dispatch(authFail(error.response.data.error));
			// });
	};
}

export const loginUser = (user, history) => {
    return dispatch => {
    axios.post('/api/users/login', user)
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
                if (res.data.user.isVerified) {
                    localStorage.setItem('isVerified', true)
                    history.push('/');
                } else {
                    history.push('/verification')
                }
            })
            .catch(err => {
                dispatch({
                    type: actions.GET_ERRORS,
                    payload: err.response.data
                });
            });
    }
}

export const setCurrentUser = obj => {
    return {
        type: actions.SET_CURRENT_USER,
        payload: obj
    }
}

export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));       
    }
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


