import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER
} from "./uiActionTypes";

export function login(email, password) {
    return {
        type: LOGIN,
        user: {
            email,
            password
        }
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

export function displayNotificationDrawer() {
    return {
        type: DISPLAY_NOTIFICATION_DRAWER
    };
}

export function hideNotificationDrawer() {
    return {
        type: HIDE_NOTIFICATION_DRAWER
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE
    };
}

export function loginRequest(email, password) {
    return function(dispatch) {
        dispatch(login(email, password));

        return fetch('http://localhost:8564/login-success.json')
        .then((res) => {
            if (res.status <= 301) {
                dispatch(loginSuccess());
            } else {
                dispatch(loginFailure());
            }
        })  
        .catch((err) => dispatch(loginFailure()))
    };
}
