import axios from 'axios';
import * as actions from './actionTypes';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';

export const fetchUser = (users) => {
    return {
        type: actions.FETCH_USERS,
        users: users
    }
};

export const isVerified = () => {
    return {
        type: actions.VERIFY        
    }
};

export const isRequestSent = (data) => {
    return {
        type: actions.IS_REQUEST_SENT,
        data: data      
    }
};

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
                    dispatch(isVerified());                    
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

export const sendMail = (mail) => {
    return dispatch => {
        const obj = {
            to: mail
        }        
        axios.post('/api/users/sendmail', obj)
            .then(res => {
                console.log(res);
                alert("mail sent");
            })
            .catch(err => {
                console.log(err);
            })
    }
}

window.onunload = function () {
    //logout code here...
    localStorage.removeItem('jwtToken');
        setAuthToken(false);
        setCurrentUser({}); 
}

export const fetchUsers = () => {
    return dispatch => {
        axios.get('/api/users/allUsers')
            .then(res => {                
                dispatch(fetchUser(res.data));
            });
    }
}

export const messageRequest = (obj) => {
    return dispatch => {
        axios.post('/api/users/messagerequest', obj)
            .then(res => {                
                console.log(res.data);
                dispatch(isRequestSent(res.data.receiverId));
            })
            .catch(err => console.log(err));
    }
}

export const findMessageRequest = (id) => {
    return dispatch => {
        axios.get('/api/users/findmessagerequest?id=' + id)
            .then(res => {                
                console.log(res.data);                
                dispatch(isRequestSent(res.data));
            })
            .catch(err => console.log(err));
    }
}

export const privateMessage = (msgObj) => {
    return dispatch => {
        axios.post('/api/users/privatemessage', msgObj)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }
}

// export const updateSocket = (id, email) => {
//     const obj = {
//         socketId: id
//     }
//     console.log(obj)
//     return dispatch => {
//         axios.put(`/api/users/updateSocket/${email}`, obj)
//             .then(res => {                
//                 console.log(res.data);                
//                 //dispatch(isRequestSent(res.data));
//             })
//             .catch(err => console.log(err));
//     }
// }

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


