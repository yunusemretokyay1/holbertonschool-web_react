import {
    MARK_AS_READ,
    SET_TYPE_FILTER,
    SET_LOADING_STATE,
    FETCH_NOTIFICATIONS_SUCCESS,
    NotificationTypeFilters
} from "./notificationActionTypes";
import {
    markAsAread,
    setNotificationFilter,
    setLoadingState,
    setNotifications,
    fetchNotifications
} from "./notificationActionCreators";
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('Notification Action creators tests', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    it('Tests the login action', () => {
        expect(markAsAread(1)).toEqual({ type: MARK_AS_READ, index: 1 });
    });
    it('Tests the logout action', () => {
        const defaultAction = {
            type: SET_TYPE_FILTER,
            filter: 'DEFAULT'
        }
        const urgentAction = {
            type: SET_TYPE_FILTER,
            filter: 'URGENT'
        }
        expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual(defaultAction);
        expect(setNotificationFilter(NotificationTypeFilters.URGENT)).toEqual(urgentAction);
    });
    it('Tests the setLoadingState action', () => {
        const action = {
            type: SET_LOADING_STATE,
            loading: true
        };
        expect(setLoadingState(true)).toEqual(action);
    });
    it('Tests the setNotifications action', () => {
        const action = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: {}
        };
        expect(setNotifications({})).toEqual(action);
    });
    it('Tests the fetchNotifications action', () => {
        const store = mockStore({});
        const expectedActions = [
            {
                type: SET_LOADING_STATE,
                loading: true
            },
            {
                type: FETCH_NOTIFICATIONS_SUCCESS,
                data: []
            },
            {
                type: SET_LOADING_STATE,
                loading: false
            }
        ];

        fetchMock.get('http://localhost:8564/notifications.json', {
            status: 200,
            body: [],
          });

        return store.dispatch(fetchNotifications()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
