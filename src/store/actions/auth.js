import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
});

export const authFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error
});

export const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = (expirationTime) => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
};

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        const url = isSignedUp
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoK8TDHbv1-GJrxMklR4VcVE9prTueBcg'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoK8TDHbv1-GJrxMklR4VcVE9prTueBcg';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error));
            })
    };
}

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
});