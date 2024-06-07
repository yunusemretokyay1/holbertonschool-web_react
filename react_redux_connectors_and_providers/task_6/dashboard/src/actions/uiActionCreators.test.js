import {
    LOGIN,
    LOGOUT,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER
} from "./uiActionTypes";
import {
    login,
    logout,
    displayNotificationDrawer,
    hideNotificationDrawer,
    loginRequest
} from "./uiActionCreators";
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('UI Action creators tests', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    it('Tests the login action', () => {
        expect(login('hello@world.com', 'Test123!')).toEqual({
            type: LOGIN,
            user : {
                email: 'hello@world.com',
                password: 'Test123!'
            }
        });
    });
    it('Tests the logout action', () => {
        expect(logout()).toEqual({ type: LOGOUT });
    });
    it('Tests the displayNotificationDrawer action', () => {
        expect(displayNotificationDrawer()).toEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
    });
    it('Tests the hideNotificationDrawer action', () => {
        expect(hideNotificationDrawer()).toEqual({ type: HIDE_NOTIFICATION_DRAWER });
    });
    it('Tests that if the API returns the right response, the store received two actions LOGIN and LOGING_SUCCESS', () => {
        const store = mockStore({});
        const email = 'test@test.com';
        const password = 'Test123!';
        const expectedActions = [
            { type: LOGIN,
                user: {
                    email,
                    password
                }
            },
            { type: LOGIN_SUCCESS },
        ];

        fetchMock.get('http://localhost:8564/login-success.json', 200);

        return store.dispatch(loginRequest(email, password)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('Tests that if the API query fails, the store received two actions LOGIN and LOGIN_FAILURE', () => {
        const store = mockStore({});
        const email = 'test@test.com';
        const password = 'Test123!';
        const expectedActions = [
            { type: LOGIN,
                user: {
                    email,
                    password
                }
            },
            { type: LOGIN_FAILURE },
        ];

        fetchMock.get('http://localhost:8564/login-success.json', 500);

        return store.dispatch(loginRequest(email, password)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
