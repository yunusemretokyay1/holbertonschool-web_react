import { FETCH_NOTIFICATIONS_SUCCESS } from "../actions/notificationActionTypes";
import { setNotificationFilter, markAsAread } from "../actions/notificationActionCreators";
import { notificationsState, notificationReducer } from "./notificationReducer";
import { Map } from 'immutable';

describe('Test suite for notificationReducer', () => {
    it('Tests notificationReducer when no action is passed', () => {
        expect(notificationReducer(undefined, {}).toJS()).toEqual(notificationsState);
    });
    it('Tests notificationReducer when FETCH_NOTIFICATIONS_SUCCESS is passed', () => {
        const action = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
              { id: 1, type: "default", value: "New course available" },
              { id: 2, type: "urgent", value: "New resume available" },
              { id: 3, type: "urgent", value: "New data available"}
            ]
          };
        const expectedState = {
            filter: "DEFAULT",
            notifications: {
              "1": { id: 1, isRead: false, type: "default", value: "New course available" },
              "2": { id: 2, isRead: false, type: "urgent", value: "New resume available" },
              "3": { id: 3, isRead: false, type: "urgent", value: "New data available" }
            }
        };
        expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState);
    });
    it('Tests notificationReducer when MARK_AS_READ is passed', () => {
        const action = markAsAread(2);
        const initialState = {
          filter: "DEFAULT",
          notifications: {
            "1": { id: 1, isRead: false, type: "default", value: "New course available" },
            "2": { id: 2, isRead: false, type: "urgent", value: "New resume available" },
            "3": { id: 3, isRead: false, type: "urgent", value: "New data available" }
          }
        };
        const expectedState = {
          filter: "DEFAULT",
          notifications: {
            "1": { id: 1, isRead: false, type: "default", value: "New course available" },
            "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
            "3": { id: 3, isRead: false, type: "urgent", value: "New data available" }
          }
      };
        expect(notificationReducer(Map(initialState), action).toJS()).toEqual(expectedState);
    });
    it('Tests notificationReducer when SET_TYPE_FILTER is passed', () => {
        const action = setNotificationFilter('URGENT');
        const initialState = {
          filter: "DEFAULT",
          notifications: {
            "1": { id: 1, isRead: false, type: "default", value: "New course available" },
            "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
            "3": { id: 3, isRead: false, type: "urgent", value: "New data available" }
          }
      };
        const expectedState = {
          filter: "URGENT",
          notifications: {
            "1": { id: 1, isRead: false, type: "default", value: "New course available" },
            "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
            "3": { id: 3, isRead: false, type: "urgent", value: "New data available" }
          }
      };
        expect(notificationReducer(Map(initialState), action).toJS()).toEqual(expectedState);
    });
});
