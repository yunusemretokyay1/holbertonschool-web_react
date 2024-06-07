import { notificationReducer } from "../reducers/notificationReducer";
import { FETCH_NOTIFICATIONS_SUCCESS } from "../actions/notificationActionTypes";
import { filterTypeSelected, getNotifications, getUnreadNotifications } from "./notificationSelector";
import { markAsAread } from "../actions/notificationActionCreators";
import { Map } from 'immutable';

describe('Test suite for notification selcetors', () => {
    it('Tests that filterTypeSelected works as expected', () => {
        const state = notificationReducer(undefined, {});
        expect(filterTypeSelected(state.toJS())).toEqual(state.toJS().filter);
    });
    it('Tests that getNotifications returns a list of the message entities within the reducer', () => {
        const action = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
              { id: 1, type: "default", value: "New course available" },
              { id: 2, type: "urgent", value: "New resume available" },
              { id: 3, type: "urgent", value: "New data available"}
            ]
        };
        const state = notificationReducer(undefined, action);
        expect(getNotifications(state.toJS())).toEqual(Map(state.toJS().notifications));
    });
    it('Tests that getUnreadNotifications returns a list of the message entities within the reducer', () => {
        const fetchAction = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
              { id: 1, type: "default", value: "New course available" },
              { id: 2, type: "urgent", value: "New resume available" },
              { id: 3, type: "urgent", value: "New data available"}
            ]
        }
        const expectedResult = {
            '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
            '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
        };
        const action = markAsAread(2);
        const initialState = notificationReducer(undefined, fetchAction);
        const state = notificationReducer(initialState, action);
        const selectedNotifs = getUnreadNotifications(state.toJS()).toJS();
        expect(Object.keys(selectedNotifs).length).toEqual(2);
        expect(selectedNotifs).toEqual(expectedResult)
    });
});
